import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { config } from './config.js';
import { connect, Admin } from './models.js';
import { passwordHash } from './security.js';
const rl = createInterface({ input, output });
const email = (await rl.question('Admin email: ')).trim().toLowerCase(); const password = await rl.question('Admin password (12+ chars): '); rl.close();
if (!/^\S+@\S+\.\S+$/.test(email) || password.length < 12) throw new Error('Invalid admin credentials');
await connect(config.mongo); await Admin.updateOne({ email }, { $set: { email, passwordHash: passwordHash(password), role: 'ADMIN' } }, { upsert: true }); console.log('Admin created.');
