import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './event.schema';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const newEvent = new this.eventModel(createEventDto);
    return newEvent.save();
  }

  async findAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  async findOne(id: string): Promise<Event> {
    return this.eventModel.findById(id).exec();
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    return this.eventModel.findByIdAndUpdate(id, updateEventDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Event> {
    return this.eventModel.findByIdAndDelete(id).exec();
  }
}
