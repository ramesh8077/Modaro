import { z } from 'zod';
export const id = z.string().regex(/^[a-f\d]{24}$/i);
export const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(s => {
  const d = new Date(s + 'T00:00:00Z'); return !isNaN(+d) && d.toISOString().slice(0, 10) === s;
}, 'Invalid calendar date');
const money = z.number().int().min(0).max(100_000_000);
const text = (max = 200) => z.string().trim().min(1).max(max);
export const searchSchema = z.object({
  propertyId: id.optional(), unitId: id.optional(), checkIn: date, checkOut: date,
  adults: z.coerce.number().int().min(1).max(100), children: z.coerce.number().int().min(0).max(100).default(0),
}).strict();
export const holdSchema = searchSchema.extend({ unitId: id, quoteToken: z.string().min(20).max(12000) });
export const guestSchema = z.object({
  name: text(120), email: z.string().trim().email().max(254).transform(s => s.toLowerCase()),
  phone: z.string().regex(/^\+?[\d ()-]{7,25}$/), requests: z.string().trim().max(1000).default(''),
  acceptedPolicies: z.literal(true),
}).strict();
export const policySchema = z.object({
  checkInTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/), checkOutTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
  houseRules: z.array(text(500)).min(1).max(20), cancellationSummary: text(1500),
  freeCancellationDays: z.number().int().min(0).max(365), lateRefundBasisPoints: z.number().int().min(0).max(10000),
  version: text(40),
}).strict();
export const propertySchema = z.object({
  name: text(150), slug: z.string().regex(/^[a-z0-9-]{3,100}$/), description: text(5000), location: text(300),
  timezone: z.string().refine(s => { try { new Intl.DateTimeFormat('en', { timeZone: s }); return true; } catch { return false; } }),
  currency: z.literal('INR'), amenities: z.array(text(100)).max(30),
  photos: z.array(z.string().max(1000).refine(s => /^https:\/\//.test(s) || /^\/(?!\/)/.test(s), 'Use an HTTPS or local image URL')).max(30),
  policies: policySchema, status: z.enum(['DRAFT', 'PUBLISHED', 'DEMO']), verified: z.boolean(), isDemo: z.boolean(),
}).strict();
export const unitSchema = z.object({
  propertyId: id, name: text(150), maxGuests: z.number().int().min(1).max(100),
  maxAdults: z.number().int().min(1).max(100), maxChildren: z.number().int().min(0).max(100), enabled: z.boolean(),
}).strict();
export const pricingSchema = z.object({
  baseRate: money.refine(v => v > 0), minNights: z.number().int().min(1).max(90), maxNights: z.number().int().min(1).max(90),
  fees: z.array(z.object({ name: text(100), amount: money }).strict()).max(10),
  taxes: z.array(z.object({ name: text(100), basisPoints: z.number().int().min(0).max(10000) }).strict()).max(10),
}).strict().refine(v => v.maxNights >= v.minNights, 'Maximum stay must be at least minimum stay');
export const overrideSchema = z.object({ date, rate: money, minNights: z.number().int().min(1).max(90) }).strict();
export type Search = z.infer<typeof searchSchema>;
