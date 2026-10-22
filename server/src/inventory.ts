import mongoose, { type ClientSession } from 'mongoose';
import { Reservation, Inventory, Unit, Block } from './models.js';
import { ApiError, fail } from './config.js';
import { nightsBetween } from './pricing.js';

// Every writer takes this per-unit document lock first. MongoDB retries write
// conflicts; the unique nightly index remains the final inventory safeguard.
export async function lockUnit(unitId: string, session: ClientSession) {
  if (!await Unit.findOneAndUpdate({ _id: unitId }, { $inc: { revision: 1 } }, { session })) fail(404, 'NOT_FOUND', 'Unit not found');
}
export async function transaction<T>(work: (session: ClientSession) => Promise<T>): Promise<T> {
  try {
    return await mongoose.connection.transaction(work, { readPreference: 'primary', readConcern: { level: 'snapshot' }, writeConcern: { w: 'majority' } }) as T;
  } catch (error: any) {
    if (error.code === 11000) throw new ApiError(409, 'CONFLICT', 'These dates or this request were just claimed. Refresh availability and try again.');
    throw error;
  }
}
export async function reclaim(unitId: string, session: ClientSession, now = new Date()) {
  const expired = await Reservation.find({ unitId, status: { $in: ['HOLD', 'PENDING_PAYMENT'] }, expiresAt: { $lte: now } }).session(session);
  for (const booking of expired) {
    booking.status = 'EXPIRED';
    booking.history.push({ action: 'EXPIRED', at: now });
    await booking.save({ session });
    await Inventory.deleteMany({ reservationId: booking._id, kind: 'HOLD' }, { session });
  }
}
export async function expireHolds() {
  const units = await Reservation.distinct('unitId', { status: { $in: ['HOLD', 'PENDING_PAYMENT'] }, expiresAt: { $lte: new Date() } });
  for (const unitId of units) await transaction(async session => { await lockUnit(String(unitId), session); await reclaim(String(unitId), session); });
}
export async function blockDates(unitId: string, checkIn: string, checkOut: string, reason: string, adminId: string) {
  const dates = nightsBetween(checkIn, checkOut);
  return transaction(async session => {
    await lockUnit(unitId, session); await reclaim(unitId, session);
    if (await Inventory.exists({ unitId, date: { $in: dates } }).session(session)) fail(409, 'DATES_UNAVAILABLE', 'A reservation or block already occupies these dates.');
    const [block] = await Block.create([{ unitId, checkIn, checkOut, reason, createdBy: adminId }], { session });
    await Inventory.insertMany(dates.map(date => ({ unitId, date, kind: 'BLOCK', blockId: block._id })), { session });
    return block;
  });
}
