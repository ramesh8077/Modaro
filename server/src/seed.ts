import { config } from './config.js';
import { connect, Property, Unit, Pricing } from './models.js';
await connect(config.mongo);
const policies = { checkInTime: '14:00', checkOutTime: '11:00', houseRules: ['Whole-villa overnight stays only.', 'No smoking indoors.', 'Celebration enquiries are reviewed separately.'], cancellationSummary: 'Development policy: free cancellation before the configured cutoff.', freeCancellationDays: 7, lateRefundBasisPoints: 0, version: 'development-v1' };
const property = await Property.findOneAndUpdate({ slug: 'villa-modaro-development' }, { $set: { name: 'Villa Modaro (Development)', slug: 'villa-modaro-development', description: 'Development listing for the Villa Modaro whole-villa stay.', location: 'Balupur–Paonta Sahib Expressway, near Mohand Forest', timezone: 'Asia/Kolkata', currency: 'INR', amenities: ['Private pool', 'Landscaped gardens', 'Pickleball'], photos: [], policies, status: 'DEMO', verified: true, isDemo: true } }, { upsert: true, new: true });
const unit = await Unit.findOneAndUpdate({ propertyId: property._id, name: 'Whole villa' }, { $set: { propertyId: property._id, name: 'Whole villa', maxGuests: 12, maxAdults: 12, maxChildren: 8, enabled: true } }, { upsert: true, new: true });
await Pricing.findOneAndUpdate({ unitId: unit._id }, { $set: { unitId: unit._id, baseRate: 100, minNights: 1, maxNights: 30, fees: [], taxes: [] } }, { upsert: true });
console.log('Seeded explicitly labelled DEMO listing. It is visible only with ENABLE_DEMO=true.');
process.exit(0);
