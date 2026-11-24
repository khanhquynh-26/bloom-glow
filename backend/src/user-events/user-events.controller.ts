import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { UserEventsService } from './user-events.service';

export class CreateUserEventDto {
  @IsInt()
  @Type(() => Number)
  userId!: number;

  @IsString()
  eventType!: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  productId?: number;
}

@Controller('user-events')
export class UserEventsController {
  constructor(private readonly userEventsService: UserEventsService) {}

  @Post()
  create(@Body() dto: CreateUserEventDto) {
    return this.userEventsService.track(dto);
  }

  @Get()
  findAll(@Query('userId') userId?: string) {
    const parsedUserId = userId !== undefined ? Number(userId) : undefined;
    return this.userEventsService.findAll(
      parsedUserId !== undefined && !Number.isNaN(parsedUserId)
        ? parsedUserId
        : undefined,
    );
  }
}