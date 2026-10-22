# Villa Modaro

## Booking development setup

The booking system lives in [`server/`](./server/README.md) and uses Express, TypeScript, Mongoose, MongoDB transactions, Zod, and a labelled development payment simulator. The existing Vite site remains the frontend.

```powershell
cd server
npm install
Copy-Item .env.example .env
npm run seed
npm run dev
```

Run `npm run worker` in a second terminal. MongoDB must be Atlas or a local replica set; standalone MongoDB is rejected because booking holds and inventory claims require transactions. Create an admin with `npm run admin:create`. Configure `VITE_BOOKING_API_URL` when the API is not at `http://localhost:4000/api`.

`ENABLE_DEMO=true` exposes only the explicitly labelled development property. Replace its rates, policies, capacity, photos, credentials, and email provider before publishing any real listing.

## Frontend template notes

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.
You can also try [the experimental native React Compiler support in plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#rust-react-compiler) by using `compiler: true` in the plugin options instead of using the Babel plugin.

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
