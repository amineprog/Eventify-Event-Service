import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EventModule } from './event/event.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestContextMiddleware } from './common/request-context.middleware';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27018/event-service'), EventModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes('*'); // Apply middleware to all routes
  }
}
