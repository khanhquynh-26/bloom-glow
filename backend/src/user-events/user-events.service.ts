import { Injectable } from '@nestjs/common';

export interface TrackUserEventInput {
  userId: number;
  eventType: string;
  productId?: number;
  metadata?: Record<string, unknown>;
}

export interface UserEventRecord extends TrackUserEventInput {
  id: number;
  createdAt: string;
}

@Injectable()
export class UserEventsService {
  private readonly events: UserEventRecord[] = [];
  private nextId = 1;

  track(input: TrackUserEventInput): UserEventRecord {
    const record: UserEventRecord = {
      id: this.nextId++,
      userId: input.userId,
      eventType: input.eventType,
      productId: input.productId,
      metadata: input.metadata,
      createdAt: new Date().toISOString(),
    };
    this.events.push(record);
    return record;
  }

  findAll(userId?: number): UserEventRecord[] {
    if (userId === undefined) {
      return [...this.events];
    }
    return this.events.filter((item) => item.userId === userId);
  }

  findByUser(userId: number): UserEventRecord[] {
    return this.events.filter((item) => item.userId === Number(userId));
  }
}