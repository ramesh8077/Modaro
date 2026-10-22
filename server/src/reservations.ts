import { randomBytes } from 'node:crypto';
import type { z } from 'zod';
import { Reservation, Inventory, Notification, Payment, Refund } from './models.js';
import { config, ApiError, fail } from './config.js';
import { guestToken, hash, readQuote, equal } from './security.js';
import { price, localDate, nightsBetween } from './pricing.js';
import { lockUnit, reclaim, transaction } from './inventory.js';
import type { holdSchema, guestSchema } from './validation.js';

export async function createHold(input: z.infer<typeof holdSchema>, key: string) {
  const { quoteToken, ...criteria } = input;
  const requestHash = hash(JSON.stringify(criteria));
  const token = guestToken(key);
  const existing = await Reservation.findOne({ idempotencyKey: key });
  if (existing) {
    if (existing.requestHash !== requestHash) fail(409, 'IDEMPOTENCY_MISMATCH', 'Use a new request key for a different stay.');
    return { reservation: existing, token };
  }
  const signed = readQuote(quoteToken);
  return transaction(async session => {
    await lockUnit(input.unitId, session);
    const prior = await Reservation.findOne({ idempotencyKey: key }).session(session);
    if (prior) {
      if (prior.requestHash !== requestHash) fail(409, 'IDEMPOTENCY_MISMATCH', 'Request key already used.');
      return { reservation: prior, token };
    }
    const priced: any = await price(criteria, session);
    if (signed.digest !== priced.digest || Date.parse(signed.expiresAt) <= Date.now()) {
      throw new ApiError(409, 'QUOTE_CHANGED', 'Please review and accept this refreshed quote before reserving.', { quote: priced.quote });
    }
    await reclaim(input.unitId, session);
    if (await Inventory.exists({ unitId: input.unitId, date: { $in: priced.dates } }).session(session)) fail(409, 'DATES_UNAVAILABLE', 'These dates have just been reserved. Please search again.');
    const expiresAt = new Date(Date.now() + config.holdMs);
    const [reservation] = await Reservation.create([{
      reference: 'VM-' + randomBytes(6).toString('hex').toUpperCase(), unitId: input.unitId, propertyId: priced.property._id,
      checkIn: input.checkIn, checkOut: input.checkOut, adults: input.adults, children: input.children,
      status: 'HOLD', expiresAt, quote: priced.quote, policy: priced.property.policies,
      propertySnapshot: { name: priced.property.name, location: priced.property.location, timezone: priced.property.timezone, unitName: priced.unit.name, isDemo: priced.property.isDemo },
      tokenHash: hash(token), idempotencyKey: key, requestHash, history: [{ action: 'HOLD_CREATED', at: new Date() }],
    }], { session });
    await Inventory.insertMany(priced.dates.map((date: string) => ({ unitId: input.unitId, date, reservationId: reservation._id, kind: 'HOLD', expiresAt })), { session });
    return { reservation, token };
  });
}
export async function accessBooking(id: string, token: string) {
  const booking = await Reservation.findById(id).select('+tokenHash');
  if (!booking || !token || !equal(booking.tokenHash, hash(token))) fail(404, 'NOT_FOUND', 'Booking not found or access link is invalid.');
  return booking;
}
export function bookingView(booking: any) {
  const value = booking.toObject ? booking.toObject() : { ...booking };
  delete value.tokenHash; delete value.idempotencyKey; delete value.requestHash; delete value.notes;
  return value;
}
export async function saveGuest(id: string, guest: z.infer<typeof guestSchema>) {
  const initial = await Reservation.findById(id);
  return transaction(async session => {
    await lockUnit(String(initial!.unitId), session);
    const booking = await Reservation.findById(id).session(session);
    if (!['HOLD', 'PENDING_PAYMENT'].includes(booking!.status) || +booking!.expiresAt <= Date.now()) fail(409, 'HOLD_EXPIRED', 'Your hold has expired. Search for availability again.');
    booking!.guest = { name: guest.name, email: guest.email, phone: guest.phone, requests: guest.requests };
    booking!.acceptedAt = new Date();
    await booking!.save({ session });
    return bookingView(booking);
  });
}
export async function cancelBooking(id: string, actor = 'guest') {
  const initial = await Reservation.findById(id);
  if (!initial) fail(404, 'NOT_FOUND', 'Booking not found');
  return transaction(async session => {
    await lockUnit(String(initial.unitId), session);
    const booking = (await Reservation.findById(id).session(session))!;
    if (booking.status === 'CANCELLED') return bookingView(booking);
    if (booking.status === 'EXPIRED') fail(409, 'ALREADY_EXPIRED', 'This hold already expired.');
    const today = localDate(booking.propertySnapshot.timezone);
    if (booking.status === 'CONFIRMED' && booking.checkIn <= today) fail(409, 'CANCELLATION_CLOSED', 'Online cancellation closes on the check-in date. Contact the property.');
    const days = Math.floor((Date.parse(booking.checkIn) - Date.parse(today)) / 86400000);
    const refundAmount = booking.paymentStatus === 'CAPTURED'
      ? Math.round(booking.quote.total * (days >= booking.policy.freeCancellationDays ? 10000 : booking.policy.lateRefundBasisPoints) / 10000) : 0;
    booking.status = 'CANCELLED'; booking.cancelledAt = new Date();
    booking.history.push({ action: 'CANCELLED', actor, at: new Date(), refundAmount });
    if (refundAmount > 0) {
      const payment = await Payment.findOne({ reservationId: id }).session(session);
      await Refund.updateOne({ reservationId: id }, { $setOnInsert: { paymentId: payment!.paymentId, amount: refundAmount, currency: booking.quote.currency, status: 'PENDING', reason: 'POLICY_CANCELLATION', attempts: 0 } }, { upsert: true, session });
      booking.refundStatus = 'PENDING';
    }
    await booking.save({ session });
    await Inventory.deleteMany({ reservationId: id }, { session });
    if (booking.guest) await Notification.updateOne({ key: 'cancel:' + id }, { $setOnInsert: { reservationId: id, kind: 'CANCELLED', status: 'PENDING', nextAttempt: new Date() } }, { upsert: true, session });
    return bookingView(booking);
  });
}

// Called only with server-fetched captured payments, or the explicit dev simulator.
export async function settlePayment(orderId: string, entity: { id: string; amount: number; currency: string; status: string; order_id: string }) {
  const original = await Payment.findOne({ orderId });
  if (!original) fail(404, 'ORDER_UNKNOWN', 'Order not found');
  const initial = (await Reservation.findById(original.reservationId))!;
  return transaction(async session => {
    await lockUnit(String(initial.unitId), session);
    const payment = (await Payment.findById(original._id).session(session))!;
    const booking = (await Reservation.findById(initial._id).session(session))!;
    if (entity.order_id !== orderId || entity.amount !== payment.amount || entity.currency !== payment.currency) fail(400, 'PAYMENT_MISMATCH', 'Payment does not match the reservation.');
    if (payment.status === 'CAPTURED' || payment.status === 'REVIEW') return bookingView(booking);
    if (entity.status !== 'captured') {
      payment.attempts.push({ paymentId: entity.id, status: entity.status, at: new Date() });
      payment.status = entity.status === 'failed' ? 'FAILED' : 'PENDING';
      booking.paymentStatus = payment.status;
      await payment.save({ session }); await booking.save({ session });
      return bookingView(booking);
    }
    payment.paymentId = entity.id; payment.status = 'CAPTURED';
    booking.paymentStatus = 'CAPTURED';
    await reclaim(String(booking.unitId), session);
    // Reclamation may have expired this booking. Allocate afresh without displacing anyone.
    const dates = nightsBetween(booking.checkIn, booking.checkOut);
    const conflict = await Inventory.exists({ unitId: booking.unitId, date: { $in: dates }, reservationId: { $ne: booking._id } }).session(session);
    if (conflict || booking.status === 'CANCELLED' || booking.checkIn < localDate(booking.propertySnapshot.timezone)) {
      payment.status = 'REVIEW'; booking.paymentStatus = 'REVIEW'; booking.refundStatus = 'REQUIRED';
      if (booking.status !== 'CANCELLED') booking.status = 'EXPIRED';
      await Inventory.deleteMany({ reservationId: booking._id, kind: 'HOLD' }, { session });
      await Refund.updateOne({ reservationId: booking._id }, { $setOnInsert: { paymentId: entity.id, amount: entity.amount, currency: entity.currency, status: 'PENDING', reason: 'LATE_PAYMENT_NO_INVENTORY', attempts: 0 } }, { upsert: true, session });
      booking.history.push({ action: 'PAYMENT_REVIEW_REFUND_REQUIRED', at: new Date() });
    } else {
      await Inventory.deleteMany({ reservationId: booking._id }, { session });
      await Inventory.insertMany(dates.map(date => ({ unitId: booking.unitId, date, reservationId: booking._id, kind: 'CONFIRMED' })), { session });
      booking.status = 'CONFIRMED'; booking.confirmedAt = new Date();
      booking.history.push({ action: 'PAYMENT_VERIFIED_CONFIRMED', at: new Date(), provider: payment.provider });
      await Notification.updateOne({ key: 'confirm:' + booking.id }, { $setOnInsert: { reservationId: booking._id, kind: 'CONFIRMED', status: 'PENDING', nextAttempt: new Date() } }, { upsert: true, session });
    }
    await payment.save({ session }); await booking.save({ session });
    return bookingView(booking);
  });
}
