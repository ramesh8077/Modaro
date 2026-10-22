# Villa Modaro booking backend

This service uses Express, TypeScript, MongoDB/Mongoose, Zod, and a transaction-capable replica set. It supports whole-villa overnight stays; celebrations remain enquiries.

1. Install MongoDB Community as a single-node replica set, or use MongoDB Atlas. For local MongoDB, start `mongod --dbpath <data-dir> --replSet rs0 --bind_ip localhost`, then run `mongosh --eval "rs.initiate()"` once.
2. Copy `.env.example` to `.env`, set a random `TOKEN_SECRET`, and keep `ENABLE_DEMO=true` only for local development.
3. Run `npm install`, `npm run seed`, then `npm run dev` and, in another terminal, `npm run worker`.
4. The development listing uses an explicitly labelled INR 100 minor-unit nightly rate. Replace it through the protected admin API before publishing any real listing.
5. Create an admin with `npm run admin:create`. Admin access is cookie-based and has no public registration.

Razorpay remains disabled until test credentials are configured. With no credentials, the development simulator is available only when `NODE_ENV=development` and `ENABLE_DEMO=true`. Email jobs are queued in the durable `NotificationJob` collection; wire a provider adapter before launch.
