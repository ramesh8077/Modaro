import { config } from './config.js';
import { connect, Notification } from './models.js';
import { expireHolds } from './inventory.js';
await connect(config.mongo);
console.log('Modaro booking worker started');
setInterval(async () => { try { await expireHolds(); await Notification.updateMany({ status: 'PENDING', nextAttempt: { $lte: new Date() } }, { $set: { nextAttempt: new Date(Date.now() + 60_000) }, $inc: { attempts: 1 } }); } catch (e) { console.error('worker', e); } }, 30_000).unref();
await expireHolds();
