import mongoose, { Schema } from 'mongoose';
const oid = Schema.Types.ObjectId;
const mixed = Schema.Types.Mixed;
const make = (name: string, fields: Record<string, unknown>, indexes: [Record<string, any>, Record<string, any>?][] = []) => {
  const schema = new Schema(fields as any, { timestamps: true, strict: 'throw' });
  for (const [keys, options] of indexes) schema.index(keys, options);
  return mongoose.model<any>(name, schema) as any;
};
export const Property = make('Property', {
  slug: { type: String, required: true, unique: true }, name: String, description: String, location: String,
  timezone: { type: String, default: 'Asia/Kolkata' }, currency: { type: String, default: 'INR' },
  amenities: [String], photos: [String], policies: mixed,
  status: { type: String, enum: ['DRAFT', 'PUBLISHED', 'DEMO'], default: 'DRAFT' },
  verified: { type: Boolean, default: false }, isDemo: { type: Boolean, default: false },
});
export const Unit = make('Unit', {
  propertyId: { type: oid, required: true, index: true }, name: String,
  maxGuests: Number, maxAdults: Number, maxChildren: Number, enabled: Boolean,
  revision: { type: Number, default: 0 },
});
export const Pricing = make('Pricing', {
  unitId: { type: oid, required: true, unique: true }, baseRate: Number, minNights: Number, maxNights: Number,
  fees: [{ _id: false, name: String, amount: Number }],
  taxes: [{ _id: false, name: String, basisPoints: Number }],
});
export const RateOverride = make('RateOverride', {
  unitId: { type: oid, required: true }, date: { type: String, required: true }, rate: Number, minNights: Number,
}, [[{ unitId: 1, date: 1 }, { unique: true }]]);
export const Reservation = make('Reservation', {
  reference: { type: String, unique: true, required: true }, unitId: { type: oid, required: true }, propertyId: oid,
  checkIn: String, checkOut: String, adults: Number, children: Number,
  status: { type: String, enum: ['HOLD', 'PENDING_PAYMENT', 'CONFIRMED', 'EXPIRED', 'CANCELLED'] },
  expiresAt: Date, quote: mixed, policy: mixed, propertySnapshot: mixed, guest: mixed,
  tokenHash: { type: String, select: false }, idempotencyKey: { type: String, unique: true }, requestHash: String,
  paymentStatus: { type: String, default: 'UNPAID' }, refundStatus: { type: String, default: 'NONE' },
  acceptedAt: Date, cancelledAt: Date, confirmedAt: Date, notes: [String], history: [mixed],
}, [[{ status: 1, expiresAt: 1 }], [{ propertyId: 1, checkIn: 1 }], [{ 'guest.email': 1 }]]);
export const Inventory = make('NightlyInventory', {
  unitId: { type: oid, required: true }, date: { type: String, required: true },
  reservationId: oid, blockId: oid, kind: { type: String, enum: ['HOLD', 'CONFIRMED', 'BLOCK'] }, expiresAt: Date,
}, [[{ unitId: 1, date: 1 }, { unique: true }], [{ reservationId: 1 }], [{ blockId: 1 }]]);
export const Block = make('Block', { unitId: oid, checkIn: String, checkOut: String, reason: String, createdBy: oid });
export const Payment = make('Payment', {
  reservationId: { type: oid, required: true, unique: true }, provider: String,
  orderId: String, paymentId: String, amount: Number, currency: String,
  status: String, orderLease: Date, attempts: [mixed],
}, [[{ orderId: 1 }, { unique: true, partialFilterExpression: { orderId: { $type: 'string' } } }],
  [{ paymentId: 1 }, { unique: true, partialFilterExpression: { paymentId: { $type: 'string' } } }]]);
export const Refund = make('Refund', {
  reservationId: { type: oid, unique: true }, paymentId: String, amount: Number, currency: String,
  status: String, providerId: String, reason: String, leaseUntil: Date, attempts: Number, lastError: String,
}, [[{ providerId: 1 }, { unique: true, partialFilterExpression: { providerId: { $type: 'string' } } }]]);
export const Admin = make('Admin', {
  email: { type: String, unique: true }, passwordHash: { type: String, select: false }, role: { type: String, enum: ['ADMIN', 'VIEWER'] },
});
export const Session = make('AdminSession', {
  tokenHash: { type: String, unique: true }, csrf: String, adminId: oid, expiresAt: Date,
}, [[{ expiresAt: 1 }, { expireAfterSeconds: 0 }]]);
export const Audit = make('AuditLog', { adminId: oid, action: String, targetId: String, details: mixed }, [[{ createdAt: -1 }]]);
export const Notification = make('NotificationJob', {
  key: { type: String, unique: true }, reservationId: oid, kind: String, status: String,
  attempts: { type: Number, default: 0 }, nextAttempt: Date, leaseUntil: Date, lastError: String,
});
export const models = [Property, Unit, Pricing, RateOverride, Reservation, Inventory, Block, Payment, Refund, Admin, Session, Audit, Notification];

export async function connect(uri: string) {
  await mongoose.connect(uri, { autoIndex: false });
  const hello = await mongoose.connection.db!.admin().command({ hello: 1 });
  if (!hello.setName && hello.msg !== 'isdbgrid') throw new Error('Booking requires a MongoDB replica set or Atlas; standalone MongoDB is unsupported');
  for (const model of models) await model.createIndexes();
  const indexes = await Inventory.collection.indexes();
  if (!indexes.some((i: any) => i.unique && i.key.unitId === 1 && i.key.date === 1)) throw new Error('Required inventory uniqueness index is missing');
}
