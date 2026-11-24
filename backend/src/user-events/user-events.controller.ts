import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserEventDto, UserEventRecord, UserEventsService } from './user-events.service';

@Controller('user-events')
export class UserEventsController {
  constructor(private readonly userEventsService: UserEventsService) {}

  @Post()
  create(@Body() dto: CreateUserEventDto): UserEventRecord {
    return this.userEventsService.create(dto);
  }

  @Get()
  findAll(): UserEventRecord[] {
    return this.userEventsService.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string): UserEventRecord[] {
    return this.userEventsService.findByUser(Number(userId));
  }
}