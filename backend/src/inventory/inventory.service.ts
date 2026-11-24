import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './entities/inventory.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepo: Repository<Inventory>,
  ) {}

  create(dto: any) {
    return this.inventoryRepo.save(this.inventoryRepo.create(dto));
  }

  findAll() {
    return this.inventoryRepo.find();
  }

  findOne(id: number) {
    return this.inventoryRepo.findOneBy({ id });
  }

  update(id: number, dto: any) {
    return this.inventoryRepo.update(id, dto);
  }

  remove(id: number) {
    return this.inventoryRepo.delete(id);
  }
}