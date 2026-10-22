import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { config, ApiError, fail } from './config.js';
import { Property, Reservation, Unit, Pricing, Audit, Admin, Session, RateOverride } from './models.js';
import { searchSchema, holdSchema, guestSchema, propertySchema, unitSchema, pricingSchema, overrideSchema } from './validation.js';
import { availability, price } from './pricing.js';
import { createHold, accessBooking, bookingView, saveGuest, cancelBooking } from './reservations.js';
import { createOrder, verifyCallback, simulate, webhook, simulatorEnabled } from './payments.js';
import { hash, randomToken, checkPassword } from './security.js';
import { blockDates } from './inventory.js';

const app = express();
app.set('trust proxy', 1);
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({
  origin: (requestOrigin, callback) => {
    const localDevelopmentOrigin = !config.production
      && !!requestOrigin
      && /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(requestOrigin);
    callback(null, !requestOrigin || config.origins.includes(requestOrigin) || localDevelopmentOrigin);
  },
  credentials: true,
}));
app.use(cookieParser());
const json = express.json({ limit: '64kb' });
const limited = rateLimit({ windowMs: 60_000, limit: 60, standardHeaders: true });
const bookingLimit = rateLimit({ windowMs: 60_000, limit: 20, standardHeaders: true });
app.use('/api', limited);
app.get('/health', (_req, res) => res.json({ ok: true, service: 'modaro-booking-api' }));

const parsed = <T>(schema: { safeParse: (v: unknown) => { success: boolean; data?: T; error?: unknown } }, value: unknown): T => {
  const result = schema.safeParse(value); if (!result.success) throw new ApiError(422, 'VALIDATION_ERROR', 'Please check the highlighted fields.', result.error); return result.data as T;
};
const requestKey = (req: Request) => { const key = req.header('Idempotency-Key'); if (!key || !/^[A-Za-z0-9._:-]{16,100}$/.test(key)) fail(400, 'IDEMPOTENCY_REQUIRED', 'A unique Idempotency-Key is required.'); return key; };
const guestId = (req: Request) => String(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
const guestAuth = async (req: Request) => accessBooking(guestId(req), req.header('X-Booking-Token') || '');

app.get('/api/properties', async (_req, res) => {
  const properties = await Property.find({ status: { $in: config.demo ? ['PUBLISHED', 'DEMO'] : ['PUBLISHED'] }, verified: true, isDemo: config.demo ? { $in: [false, true] } : false }).select('name slug location amenities photos policies timezone currency').lean();
  res.json({ properties });
});
app.get('/api/availability', async (req, res) => {
  const input = parsed(searchSchema, req.query); res.json(await availability(input));
});
app.post('/api/quotes', bookingLimit, json, async (req, res) => {
  const input = parsed(searchSchema.extend({ unitId: (await import('zod')).z.string().regex(/^[a-f\d]{24}$/i) }), req.body);
  const result = await price(input); res.json({ property: result.property, unit: result.unit, quote: result.quote });
});
app.post('/api/holds', bookingLimit, json, async (req, res) => {
  const input = parsed(holdSchema, req.body); const result = await createHold(input, requestKey(req));
  res.status(201).json({ reservation: bookingView(result.reservation), token: result.token });
});
app.get('/api/bookings/:id', async (req, res) => res.json({ reservation: bookingView(await guestAuth(req)) }));
app.post('/api/bookings/:id/guest', bookingLimit, json, async (req, res) => { await guestAuth(req); res.json({ reservation: await saveGuest(guestId(req), parsed(guestSchema, req.body)) }); });
app.post('/api/bookings/:id/order', bookingLimit, async (req, res) => { await guestAuth(req); res.json(await createOrder(guestId(req))); });
app.post('/api/bookings/:id/verify-payment', bookingLimit, json, async (req, res) => { await guestAuth(req); res.json({ reservation: await verifyCallback(guestId(req), req.body) }); });
app.post('/api/bookings/:id/simulate-payment', bookingLimit, json, async (req, res) => { if (!simulatorEnabled()) fail(404, 'NOT_FOUND', 'Not found'); await guestAuth(req); res.json({ reservation: await simulate(guestId(req), req.body.outcome === 'success' ? 'success' : req.body.outcome === 'failed' ? 'failed' : 'cancelled') }); });
app.post('/api/bookings/:id/cancel', bookingLimit, async (req, res) => { await guestAuth(req); res.json({ reservation: await cancelBooking(guestId(req)) }); });

// Razorpay requires the raw request bytes for HMAC validation.
app.post('/api/payments/webhook', express.raw({ type: 'application/json', limit: '256kb' }), async (req, res) => { await webhook(req.body as Buffer, req.header('X-Razorpay-Signature') || ''); res.json({ ok: true }); });

type AdminRequest = Request & { admin?: any };
async function requireAdmin(req: AdminRequest, res: Response, next: NextFunction) {
  try {
    const raw = req.cookies?.modaro_admin; if (!raw) return res.status(401).json({ code: 'ADMIN_AUTH_REQUIRED', message: 'Admin login required.' });
    const session = await Session.findOne({ tokenHash: hash(raw), expiresAt: { $gt: new Date() } });
    if (!session) return res.status(401).json({ code: 'ADMIN_AUTH_REQUIRED', message: 'Admin session expired.' });
    req.admin = await Admin.findById(session.adminId).lean(); if (!req.admin) return res.status(401).json({ code: 'ADMIN_AUTH_REQUIRED', message: 'Admin unavailable.' });
    next();
  } catch (e) { next(e); }
}
app.post('/api/admin/login', bookingLimit, json, async (req, res) => {
  const email = typeof req.body?.email === 'string' ? req.body.email.toLowerCase().trim() : ''; const password = req.body?.password;
  if (typeof password !== 'string' || password.length < 12) fail(422, 'VALIDATION_ERROR', 'Use a password of at least 12 characters.');
  const admin = await Admin.findOne({ email }).select('+passwordHash');
  if (!admin || !checkPassword(password, admin.passwordHash)) fail(401, 'AUTH_FAILED', 'Email or password is incorrect.');
  const raw = randomToken(); await Session.create({ tokenHash: hash(raw), csrf: randomToken(), adminId: admin._id, expiresAt: new Date(Date.now() + 8 * 3600000) });
  res.cookie('modaro_admin', raw, { httpOnly: true, secure: config.production, sameSite: 'lax', maxAge: 8 * 3600000 }); res.json({ ok: true, role: admin.role });
});
app.post('/api/admin/logout', (req, res) => { if (req.cookies?.modaro_admin) Session.deleteOne({ tokenHash: hash(req.cookies.modaro_admin) }).catch(() => {}); res.clearCookie('modaro_admin'); res.json({ ok: true }); });
app.get('/api/admin/dashboard', requireAdmin, async (_req, res) => {
  const [upcoming, holds, attention, cancellations] = await Promise.all([
    Reservation.countDocuments({ status: 'CONFIRMED', checkIn: { $gte: new Date().toISOString().slice(0, 10) } }),
    Reservation.countDocuments({ status: { $in: ['HOLD', 'PENDING_PAYMENT'] }, expiresAt: { $gt: new Date() } }),
    Reservation.countDocuments({ paymentStatus: { $in: ['REVIEW', 'FAILED'] } }), Reservation.countDocuments({ status: 'CANCELLED' }),
  ]); res.json({ upcoming, holds, attention, cancellations });
});
app.get('/api/admin/reservations', requireAdmin, async (req, res) => {
  const allowed = ['HOLD', 'PENDING_PAYMENT', 'CONFIRMED', 'EXPIRED', 'CANCELLED']; const status = typeof req.query.status === 'string' && allowed.includes(req.query.status) ? req.query.status : undefined;
  const rows = await Reservation.find(status ? { status } : {}).sort({ checkIn: 1 }).limit(200).lean(); res.json({ reservations: rows.map(bookingView) });
});
app.post('/api/admin/properties', requireAdmin, json, async (req: AdminRequest, res) => { const value = parsed(propertySchema, req.body); if (value.status === 'PUBLISHED' && (!value.verified || value.isDemo)) fail(422, 'PUBLISH_BLOCKED', 'Only verified non-demo listings can be published.'); const property = await Property.create(value); await Audit.create({ adminId: req.admin._id, action: 'PROPERTY_CREATED', targetId: property.id }); res.status(201).json({ property }); });
app.patch('/api/admin/properties/:id', requireAdmin, json, async (req: AdminRequest, res) => { const value = parsed(propertySchema.partial(), req.body); if (value.status === 'PUBLISHED' && (!value.verified || value.isDemo)) fail(422, 'PUBLISH_BLOCKED', 'Only verified non-demo listings can be published.'); const property = await Property.findByIdAndUpdate(req.params.id, value, { new: true, runValidators: true }); if (!property) fail(404, 'NOT_FOUND', 'Property not found'); await Audit.create({ adminId: req.admin._id, action: 'PROPERTY_UPDATED', targetId: property.id, details: value }); res.json({ property }); });
app.post('/api/admin/units', requireAdmin, json, async (req: AdminRequest, res) => { const unit = await Unit.create(parsed(unitSchema, req.body)); await Audit.create({ adminId: req.admin._id, action: 'UNIT_CREATED', targetId: unit.id }); res.status(201).json({ unit }); });
app.patch('/api/admin/units/:id/pricing', requireAdmin, json, async (req: AdminRequest, res) => { const value = parsed(pricingSchema, req.body); const pricing = await Pricing.findOneAndUpdate({ unitId: req.params.id }, { ...value, unitId: req.params.id }, { new: true, upsert: true, runValidators: true }); await Audit.create({ adminId: req.admin._id, action: 'PRICING_UPDATED', targetId: req.params.id }); res.json({ pricing }); });
app.post('/api/admin/units/:id/overrides', requireAdmin, json, async (req: AdminRequest, res) => { const value = parsed(overrideSchema, req.body); const override = await RateOverride.findOneAndUpdate({ unitId: req.params.id, date: value.date }, { ...value, unitId: req.params.id }, { new: true, upsert: true, runValidators: true }); res.json({ override }); });
app.post('/api/admin/units/:id/blocks', requireAdmin, json, async (req: AdminRequest, res) => { const body = req.body; const unitId = String(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id); if (typeof body?.checkIn !== 'string' || typeof body?.checkOut !== 'string' || typeof body?.reason !== 'string' || body.reason.length > 500) fail(422, 'VALIDATION_ERROR', 'Valid dates and a reason are required.'); const block = await blockDates(unitId, body.checkIn, body.checkOut, body.reason, req.admin._id); await Audit.create({ adminId: req.admin._id, action: 'DATES_BLOCKED', targetId: unitId, details: body }); res.status(201).json({ block }); });
app.use((error: any, _req: Request, res: Response, _next: NextFunction) => { console.error(error instanceof ApiError ? error.code : 'UNHANDLED_ERROR', error.message); const e = error instanceof ApiError ? error : new ApiError(500, 'SERVER_ERROR', 'Something went wrong.'); res.status(e.status).json({ code: e.code, message: e.message, ...(config.production ? {} : { details: e.details }) }); });
export default app;
