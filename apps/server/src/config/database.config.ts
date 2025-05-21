import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => {

  return {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || '127.0.0.1',
    port: parseInt(process.env.POSTGRES_HOST || '3306'),
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB || 'application',
    synchronize: true,
  };
});