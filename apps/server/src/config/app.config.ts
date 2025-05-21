import { registerAs } from '@nestjs/config';
import { config, description, version } from '../../package.json';

export const appConfig = registerAs('app', () => {
  if (!process.env.JWT_SECRET) throw new Error('env JWT_SECRET required');

  return {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || '3000',
    name: config.name,
    description: description,
    version: version,
    throttle: {
      ttl: parseInt(process.env.THROTTLE_TTL || '60000', 10),
      limit: parseInt(process.env.THROTTLE_LIMIT || '30', 10),
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRED_IN || '1d',
    },
  };
});
