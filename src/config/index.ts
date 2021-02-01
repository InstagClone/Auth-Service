import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT,
  jwtKey: process.env.JWT_KEY
}
