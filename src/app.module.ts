import { Module } from '@nestjs/common';
import { EventModule } from './event/event.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://event-mongo:27017/event-service'),EventModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
