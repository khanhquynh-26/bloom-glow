import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
  ) {}

  create(dto: any) {
    return this.notificationRepo.save(this.notificationRepo.create(dto));
  }

  findAll() {
    return this.notificationRepo.find();
  }

  findOne(id: number) {
    return this.notificationRepo.findOneBy({ id });
  }

  update(id: number, dto: any) {
    return this.notificationRepo.update(id, dto);
  }

  remove(id: number) {
    return this.notificationRepo.delete(id);
  }
}