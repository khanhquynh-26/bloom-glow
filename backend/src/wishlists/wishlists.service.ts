import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepo: Repository<Wishlist>,
  ) {}

  create(dto: any) {
    return this.wishlistRepo.save(this.wishlistRepo.create(dto));
  }

  findAll() {
    return this.wishlistRepo.find();
  }

  findOne(id: number) {
    return this.wishlistRepo.findOneBy({ id });
  }

  update(id: number, dto: any) {
    return this.wishlistRepo.update(id, dto);
  }

  remove(id: number) {
    return this.wishlistRepo.delete(id);
  }
}