import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT,
  jwtKey: process.env.JWT_KEY,
  pg_connection_string: process.env.PG_CONNECTION_STRING
}
