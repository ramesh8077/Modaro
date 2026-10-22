import { config as loadEnv } from 'dotenv';
import { randomBytes } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Support both `npm run dev` from server/ and `npm --prefix server run dev` from the project root.
loadEnv({ path: resolve(process.cwd(), '.env') });
loadEnv({ path: resolve(process.cwd(), 'server/.env') });

const production = process.env.NODE_ENV === 'production';
const dataDir = resolve(process.env.DATA_DIR || '.data');
let secret = process.env.TOKEN_SECRET;
if (!secret && !production) {
  mkdirSync(dataDir, { recursive: true });
  const file = resolve(dataDir, 'token-secret');
  if (!existsSync(file)) writeFileSync(file, randomBytes(48).toString('hex'), { mode: 0o600 });
  secret = readFileSync(file, 'utf8');
}
if (!secret || secret.length < 32) throw new Error('TOKEN_SECRET must contain at least 32 characters');
export const config = {
  production, dataDir, secret,
  port: Number(process.env.PORT || 4000),
  origins: (process.env.FRONTEND_ORIGIN || 'http://localhost:5173,http://localhost:5174')
    .split(',').map((value) => value.trim()).filter(Boolean),
  mongo: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/modaro?replicaSet=rs0',
  holdMs: Number(process.env.HOLD_MINUTES || 10) * 60_000,
  demo: !production && process.env.ENABLE_DEMO === 'true',
  razorKey: process.env.RAZORPAY_KEY_ID || '',
  razorSecret: process.env.RAZORPAY_KEY_SECRET || '',
  webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET || '',
  emailKey: process.env.RESEND_API_KEY || '',
  emailFrom: process.env.EMAIL_FROM || '',
};
if (config.razorKey && !config.razorKey.startsWith('rzp_test_')) throw new Error('Only Razorpay test keys are supported in this release');
if (!Number.isFinite(config.holdMs) || config.holdMs < 60_000 || config.holdMs > 30 * 60_000) throw new Error('HOLD_MINUTES must be 1–30');

export class ApiError extends Error {
  constructor(public status: number, public code: string, message: string, public details?: unknown) { super(message); }
}
export function fail(status: number, code: string, message: string): never { throw new ApiError(status, code, message); }
