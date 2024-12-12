import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import logger, { mapNestToWinstonLevel } from './common/logger.factory';
import { HttpExceptionFilter } from './common/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger({
    log: (message, context) => logger.log({ level: mapNestToWinstonLevel('log'), message, context }),
    error: (message, trace, context) => logger.error({ message, trace, context }),
    warn: (message, context) => logger.warn({ message, context }),
    debug: (message, context) => logger.debug({ message, context }),
    verbose: (message, context) => logger.debug({ message, context }),
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  const PORT = process.env.PORT ?? 3000;

  await app.listen(PORT, () => {
    logger.info({
      context: 'NestBootstrap',
      message: `Nest application successfully started ${PORT}`,
    });
  });
}
bootstrap();
