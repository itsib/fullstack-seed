import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from '@app/common/filters/http-exception.filter';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { LoggerService } from './common/services/logger.service';
import { resolve } from 'node:path';

async function createApp(): Promise<INestApplication> {
  const logger = process.env.NODE_ENV === 'production' ? null : new LoggerService('Fastify');
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: !logger
        ? false
        : {
            level: 'debug',
            stream: logger.stream,
          },
    }),
  );

  const configService = app.get(ConfigService);
  const name = configService.get<string>('app.name')!;
  const description = configService.get<string>('app.description')!;
  const version = configService.get<string>('app.version')!;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.setGlobalPrefix('/api/v1/', { exclude: ['health', 'docs'] });

  app.useStaticAssets({
    root: resolve(__dirname, 'public'),
    extensions: ['svg', 'png', 'css', 'ico', 'eot', 'woff', 'woff2', 'ttf'],
    prefix: '/static',
  });

  app.useGlobalFilters(new HttpExceptionFilter());

  const swaggerConfig = new DocumentBuilder().setTitle(name).setDescription(description).setVersion(version).build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, {
    customfavIcon: '/static/favicon.ico',
    customCssUrl: '/static/swagger-dark.css',
    customSiteTitle: `Swagger Documentation - ${name}`,
  });

  return app;
}

export const ServerApp = (async () => {
  const app = await createApp();

  if (process.env.NX_NEST_MODE !== 'middleware') {
    const configService = app.get(ConfigService);

    const host: string = configService.get<string>('app.host') as string;
    const port: number = configService.get<number>('app.port') as number;

    await app.listen(port, host, async () => {
      Logger.log('Application Running');
    });
  } else {
    Logger.log('Application Initialized');
  }

  return app;
})();
