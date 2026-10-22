import { Payment, Reservation } from './models.js';
import { config, fail } from './config.js';
import { equal, signature } from './security.js';
import { transaction, lockUnit } from './inventory.js';
import { settlePayment } from './reservations.js';

export const simulatorEnabled = () => !config.production && !config.razorKey && config.demo;
export async function razor(path: string, method = 'GET', body?: unknown) {
  if (!config.razorKey || !config.razorSecret) fail(503, 'PAYMENT_NOT_CONFIGURED', 'Test payment credentials are not configured.');
  const response = await fetch('https://api.razorpay.com/v1' + path, {
    method, headers: { Authorization: 'Basic ' + Buffer.from(config.razorKey + ':' + config.razorSecret).toString('base64'), 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined, signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) fail(502, 'PROVIDER_ERROR', 'Payment provider could not complete the request.');
  return response.json() as Promise<any>;
}
export async function createOrder(id: string) {
  const initial = await Reservation.findById(id);
  const payment = await transaction(async session => {
    await lockUnit(String(initial!.unitId), session);
    const booking = (await Reservation.findById(id).session(session))!;
    if (!['HOLD', 'PENDING_PAYMENT'].includes(booking.status) || +booking.expiresAt <= Date.now()) fail(409, 'HOLD_EXPIRED', 'Your hold expired. Search again.');
    if (!booking.guest || !booking.acceptedAt) fail(422, 'GUEST_REQUIRED', 'Complete guest details and accept the policies first.');
    const existing = await Payment.findOne({ reservationId: id }).session(session);
    if (existing) return existing;
    if (!simulatorEnabled() && (!config.razorKey || !config.razorSecret)) fail(503, 'PAYMENT_NOT_CONFIGURED', 'Payments are not configured.');
    booking.status = 'PENDING_PAYMENT';
    await booking.save({ session });
    const [created] = await Payment.create([{ reservationId: id, provider: simulatorEnabled() ? 'DEVELOPMENT_SIMULATOR' : 'RAZORPAY_TEST', amount: booking.quote.total, currency: booking.quote.currency, status: 'NEW' }], { session });
    return created;
  });
  if (!payment.orderId) {
    // CAS: only one caller performs the external order request. An ambiguous timeout
    // requires reconciliation; never blindly create a second chargeable order.
    const owned = await Payment.findOneAndUpdate({ _id: payment._id, status: 'NEW' }, { $set: { status: 'CREATING', orderLease: new Date() } }, { new: true });
    if (!owned) fail(409, 'ORDER_PENDING', 'Order creation is in progress or needs reconciliation. Please retry shortly.');
    try {
      const order = simulatorEnabled() ? { id: 'dev_order_' + payment.id, amount: payment.amount, currency: payment.currency }
        : await razor('/orders', 'POST', { amount: payment.amount, currency: payment.currency, receipt: initial!.reference, notes: { reservationId: id }, partial_payment: false });
      if (order.amount !== payment.amount || order.currency !== payment.currency) fail(502, 'ORDER_MISMATCH', 'Provider returned an incorrect order.');
      await Payment.updateOne({ _id: payment._id }, { $set: { orderId: order.id, status: 'PENDING' } });
      payment.orderId = order.id;
    } catch (error) {
      await Payment.updateOne({ _id: payment._id }, { $set: { status: 'ORDER_REVIEW' } });
      throw error;
    }
  }
  return { orderId: payment.orderId, amount: payment.amount, currency: payment.currency, mode: payment.provider, keyId: config.razorKey };
}
export async function verifyCallback(id: string, input: { paymentId: string; orderId: string; signature: string }) {
  const payment = await Payment.findOne({ reservationId: id });
  if (!payment || payment.provider !== 'RAZORPAY_TEST' || payment.orderId !== input.orderId || !equal(signature(payment.orderId + '|' + input.paymentId, config.razorSecret), input.signature)) fail(400, 'SIGNATURE_INVALID', 'Payment verification failed.');
  const entity = await razor('/payments/' + encodeURIComponent(input.paymentId));
  return settlePayment(payment.orderId, entity);
}
export async function simulate(id: string, outcome: 'success' | 'failed' | 'cancelled') {
  if (!simulatorEnabled()) fail(404, 'NOT_FOUND', 'Not found');
  const payment = await Payment.findOne({ reservationId: id });
  if (!payment?.orderId || payment.provider !== 'DEVELOPMENT_SIMULATOR') fail(409, 'ORDER_REQUIRED', 'Create a development order first.');
  return settlePayment(payment.orderId, { id: 'dev_payment_' + payment.id, order_id: payment.orderId, amount: payment.amount, currency: payment.currency, status: outcome === 'success' ? 'captured' : outcome === 'failed' ? 'failed' : 'cancelled' });
}
export async function webhook(body: Buffer, mac: string) {
  if (!config.webhookSecret || !equal(signature(body.toString('utf8'), config.webhookSecret), mac)) fail(400, 'SIGNATURE_INVALID', 'Invalid webhook signature');
  const event = JSON.parse(body.toString('utf8'));
  if (['payment.captured', 'payment.failed', 'payment.authorized'].includes(event.event)) {
    const supplied = event.payload?.payment?.entity;
    if (typeof supplied?.id !== 'string' || !/^pay_[a-zA-Z0-9]+$/.test(supplied.id)) fail(400, 'EVENT_INVALID', 'Invalid payment event');
    const entity = await razor('/payments/' + supplied.id);
    if (await Payment.exists({ orderId: entity.order_id })) await settlePayment(entity.order_id, entity);
  }
  // Refund status is reconciled by the worker against the provider, independent of event order.
}
