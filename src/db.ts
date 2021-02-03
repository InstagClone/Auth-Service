import { Pool } from 'pg';
import log from './utils/logger';
import config from './config';

const db = new Pool({ connectionString: config.pg_connection_string });

db.on('error', (err) => {
  log.error('Connection error', err.stack);
});

export const query = db.query.bind(db);
