import { Injectable } from '@nestjs/common';

export type UserEventType = 'view' | 'search' | 'add_to_cart' | 'purchase';

export class UserEventRecord {
  id!: number;
  userId!: number;
  productId?: number;
  keyword?: string;
  eventType!: UserEventType;
  createdAt!: string;
}

export class CreateUserEventDto {
  userId?: number;
  productId?: number;
  keyword?: string;
  eventType!: UserEventType;
}

@Injectable()
export class UserEventsService {
  private events: UserEventRecord[] = [];

  create(dto: CreateUserEventDto): UserEventRecord {
    const newEvent: UserEventRecord = {
      id: this.events.length + 1,
      userId: dto.userId ?? 1,
      productId: dto.productId,
      keyword: dto.keyword,
      eventType: dto.eventType,
      createdAt: new Date().toISOString(),
    };
    this.events.push(newEvent);
    return newEvent;
  }

  findAll(): UserEventRecord[] {
    return this.events;
  }

  findByUser(userId: number): UserEventRecord[] {
    return this.events.filter((e) => e.userId === Number(userId));
  }
}