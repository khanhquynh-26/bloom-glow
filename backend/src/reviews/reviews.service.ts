import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepo: Repository<Review>,
  ) {}

  create(dto: any) {
    return this.reviewRepo.save(this.reviewRepo.create(dto));
  }

  findAll() {
    return this.reviewRepo.find();
  }

  findOne(id: number) {
    return this.reviewRepo.findOneBy({ id });
  }

  update(id: number, dto: any) {
    return this.reviewRepo.update(id, dto);
  }

  remove(id: number) {
    return this.reviewRepo.delete(id);
  }
}