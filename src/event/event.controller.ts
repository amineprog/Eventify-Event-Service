import { Controller, Get, Post, Body, Put, Param, Delete, Logger, Req } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import logger from 'src/common/logger.factory';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get()
  findAll(@Req() req: Request) {
    const requestId = req.headers['x-request-id'];
    logger.info({
      context: EventController.name,
      message: `findAll() called `,
      requestId
    })
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(id, updateEventDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.eventService.delete(id);
  }
}
