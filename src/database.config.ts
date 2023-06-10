import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
  user: process.env.DATABASE_USER,
  pass: process.env.DATABASE_PASSWORD,
  auth_enabled: process.env.AUTH_ENABLED,
}));
