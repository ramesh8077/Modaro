import type { ClientSession } from 'mongoose';
import { Property, Unit, Pricing, RateOverride, Inventory } from './models.js';
import { config, fail } from './config.js';
import { hash, signQuote } from './security.js';
import { policySchema, pricingSchema, type Search } from './validation.js';

export function localDate(timezone = 'Asia/Kolkata', now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: timezone, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
  const get = (type: string) => parts.find(p => p.type === type)!.value;
  return `${get('year')}-${get('month')}-${get('day')}`;
}
export function nightsBetween(checkIn: string, checkOut: string) {
  const count = (Date.parse(checkOut + 'T00:00:00Z') - Date.parse(checkIn + 'T00:00:00Z')) / 86400000;
  if (!Number.isInteger(count) || count < 1 || count > 90) fail(422, 'DATES_INVALID', 'Choose a stay between 1 and 90 nights, with checkout after check-in.');
  return Array.from({ length: count }, (_, i) => new Date(Date.parse(checkIn + 'T00:00:00Z') + i * 86400000).toISOString().slice(0, 10));
}
export const publicFilter = () => ({ $or: [{ status: 'PUBLISHED', verified: true, isDemo: false }, ...(config.demo ? [{ status: 'DEMO', isDemo: true }] : [])] });
export async function price(input: Search & { unitId: string }, session?: ClientSession) {
  const unit: any = await Unit.findById(input.unitId).session(session || null).lean();
  if (!unit || !unit.enabled) fail(404, 'UNIT_UNAVAILABLE', 'This accommodation is not bookable.');
  const property: any = await Property.findOne({ _id: unit.propertyId, ...publicFilter() }).session(session || null).lean();
  if (!property || (input.propertyId && String(property._id) !== input.propertyId)) fail(404, 'PROPERTY_UNAVAILABLE', 'This property is not bookable.');
  if (!policySchema.safeParse(property.policies).success) fail(422, 'PROPERTY_INCOMPLETE', 'Booking policies have not been configured.');
  if (input.checkIn < localDate(property.timezone)) fail(422, 'PAST_DATE', 'Check-in cannot be in the past.');
  if (input.adults > unit.maxAdults || input.children > unit.maxChildren || input.adults + input.children > unit.maxGuests) fail(422, 'GUEST_LIMIT', `This unit allows up to ${unit.maxGuests} guests, ${unit.maxAdults} adults and ${unit.maxChildren} children.`);
  const dates = nightsBetween(input.checkIn, input.checkOut);
  const rule: any = await Pricing.findOne({ unitId: unit._id }).session(session || null).lean();
  if (!rule || !pricingSchema.safeParse({ baseRate: rule.baseRate, minNights: rule.minNights, maxNights: rule.maxNights, fees: rule.fees, taxes: rule.taxes }).success) fail(422, 'RATES_MISSING', 'Verified rates have not been configured.');
  const overrides = await RateOverride.find({ unitId: unit._id, date: { $in: dates } }).session(session || null).lean();
  const minNights = Math.max(rule.minNights, ...overrides.map((o: any) => o.minNights));
  if (dates.length < minNights || dates.length > rule.maxNights) fail(422, 'STAY_RULE', `Choose between ${minNights} and ${rule.maxNights} nights for these dates.`);
  const nightly = dates.map(date => ({ date, amount: overrides.find((o: any) => o.date === date)?.rate ?? rule.baseRate }));
  const subtotal = nightly.reduce((sum, n) => sum + n.amount, 0);
  const fees = rule.fees.map((f: any) => ({ name: f.name, amount: f.amount }));
  const taxable = subtotal + fees.reduce((sum: number, f: any) => sum + f.amount, 0);
  const taxes = rule.taxes.map((t: any) => ({ name: t.name, amount: Math.round(taxable * t.basisPoints / 10000), basisPoints: t.basisPoints }));
  const total = taxable + taxes.reduce((sum: number, t: any) => sum + t.amount, 0);
  if (!Number.isSafeInteger(total) || total <= 0) fail(422, 'PRICE_INVALID', 'Rates need review before this unit can be booked.');
  const quote = { nightly, nights: dates.length, subtotal, fees, taxes, total, currency: property.currency, isDemo: property.isDemo };
  const digest = hash(JSON.stringify({ input, quote, policies: property.policies, capacity: [unit.maxGuests, unit.maxAdults, unit.maxChildren] }));
  const expiresAt = new Date(Date.now() + 5 * 60_000).toISOString();
  return { property, unit, dates, quote: { ...quote, expiresAt, token: signQuote({ digest, expiresAt, input }) }, digest };
}
export async function availability(input: Search) {
  const properties: any[] = await Property.find({ ...publicFilter(), ...(input.propertyId ? { _id: input.propertyId } : {}) }).lean() as any;
  const units = await Unit.find({ propertyId: { $in: properties.map(p => p._id) }, enabled: true, ...(input.unitId ? { _id: input.unitId } : {}) }).lean();
  const results = [];
  for (const unit of units) {
    try {
      const priced = await price({ ...input, unitId: String(unit._id) });
      // Expired HOLD claims are reclaimable. Confirmed and blocked dates always conflict.
      const conflicts = await Inventory.countDocuments({ unitId: unit._id, date: { $in: priced.dates }, $or: [{ kind: { $ne: 'HOLD' } }, { expiresAt: { $gt: new Date() } }] });
      results.push({ property: priced.property, unit, available: conflicts === 0, quote: priced.quote, reason: conflicts ? 'These dates are already reserved or blocked.' : undefined });
    } catch (error: any) {
      if (!error.status || error.status >= 500) throw error;
      results.push({ property: properties.find((p: any) => String(p._id) === String(unit.propertyId)), unit, available: false, reason: error.message });
    }
  }
  return { results, checkedAt: new Date().toISOString() };
}
