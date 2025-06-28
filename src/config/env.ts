import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || '3000',
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
  DATABASE_URL: process.env.DATABASE_URL,
  WEBAPP_DOMAIN: process.env.WEBAPP_DOMAIN,
};
