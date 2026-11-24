import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';

/** Mọi hàm đều lọc theo userId: user chỉ thao tác được địa chỉ của chính mình */
@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address) private readonly addressRepo: Repository<Address>,
    private readonly dataSource: DataSource,
  ) {}

  findAll(userId: number): Promise<Address[]> {
    return this.addressRepo.find({
      where: { userId },
      order: { isDefault: 'DESC', createdAt: 'DESC' },
    });
  }

  async findOne(id: number, userId: number): Promise<Address> {
    const address = await this.addressRepo.findOne({ where: { id, userId } });
    if (!address) throw new NotFoundException(`Không tìm thấy địa chỉ #${id}`);
    return address;
  }

  create(userId: number, dto: CreateAddressDto): Promise<Address> {
    return this.dataSource.transaction(async (manager) => {
      const repo = manager.getRepository(Address);
      const count = await repo.count({ where: { userId } });

      // Địa chỉ đầu tiên luôn là mặc định
      const isDefault = count === 0 ? true : dto.isDefault === true;
      if (isDefault) await repo.update({ userId }, { isDefault: false });

      return repo.save(repo.create({ ...dto, userId, isDefault }));
    });
  }

  update(id: number, userId: number, dto: UpdateAddressDto): Promise<Address> {
    return this.dataSource.transaction(async (manager) => {
      const repo = manager.getRepository(Address);
      const address = await repo.findOne({ where: { id, userId } });
      if (!address) throw new NotFoundException(`Không tìm thấy địa chỉ #${id}`);

      const { isDefault, ...rest } = dto;
      Object.assign(address, rest);

      // Chỉ cho phép "bật" mặc định; muốn bỏ mặc định thì đặt địa chỉ khác làm mặc định
      if (isDefault === true && !address.isDefault) {
        await repo.update({ userId }, { isDefault: false });
        address.isDefault = true;
      }
      return repo.save(address);
    });
  }

  setDefault(id: number, userId: number): Promise<Address> {
    return this.update(id, userId, { isDefault: true });
  }

  remove(id: number, userId: number): Promise<{ message: string }> {
    return this.dataSource.transaction(async (manager) => {
      const repo = manager.getRepository(Address);
      const address = await repo.findOne({ where: { id, userId } });
      if (!address) throw new NotFoundException(`Không tìm thấy địa chỉ #${id}`);

      await repo.remove(address);

      // Xóa địa chỉ mặc định -> chuyển mặc định sang địa chỉ mới nhất còn lại
      if (address.isDefault) {
        const next = await repo.findOne({ where: { userId }, order: { createdAt: 'DESC' } });
        if (next) await repo.update({ id: next.id }, { isDefault: true });
      }
      return { message: `Đã xóa địa chỉ #${id}` };
    });
  }
}
