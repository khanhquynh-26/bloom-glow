import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupon } from './entities/coupon.entity';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepo: Repository<Coupon>,
  ) {}

  create(dto: any) {
    return this.couponRepo.save(this.couponRepo.create(dto));
  }

  findAll() {
    return this.couponRepo.find();
  }

  findOne(id: number) {
    return this.couponRepo.findOneBy({ id });
  }

  update(id: number, dto: any) {
    return this.couponRepo.update(id, dto);
  }

  remove(id: number) {
    return this.couponRepo.delete(id);
  }
}