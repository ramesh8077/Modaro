import { createHash, createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { config, fail } from './config.js';
export const hash = (s: string) => createHash('sha256').update(s).digest('hex');
export const randomToken = () => randomBytes(32).toString('base64url');
export const signature = (s: string, secret = config.secret) => createHmac('sha256', secret).update(s).digest('hex');
export function equal(a: string, b: string) { const x = Buffer.from(a), y = Buffer.from(b); return x.length === y.length && timingSafeEqual(x, y); }
export const guestToken = (key: string) => signature('guest-reservation:' + key);
export function signQuote(value: unknown) { const data = Buffer.from(JSON.stringify(value)).toString('base64url'); return data + '.' + signature(data); }
export function readQuote(token: string) {
  const [data, mac] = token.split('.');
  if (!data || !mac || !equal(signature(data), mac)) fail(400, 'QUOTE_INVALID', 'Please request a new quote.');
  try { return JSON.parse(Buffer.from(data, 'base64url').toString()); } catch { fail(400, 'QUOTE_INVALID', 'Invalid quote'); }
}
export function passwordHash(password: string) { const salt = randomBytes(16).toString('hex'); return salt + ':' + scryptSync(password, salt, 64).toString('hex'); }
export function checkPassword(password: string, stored: string) {
  const [salt, expected] = stored.split(':');
  return !!salt && !!expected && equal(scryptSync(password, salt, 64).toString('hex'), expected);
}
