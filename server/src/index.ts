import app from './app.js';
import { config } from './config.js';
import { connect } from './models.js';
await connect(config.mongo);
app.listen(config.port, () => console.log(`Modaro booking API listening on ${config.port}`));
