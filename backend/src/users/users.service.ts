import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserRole, UserStatus } from './entities/user.entity';

const SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

  findAll(): Promise<User[]> {
    return this.userRepo.find({ order: { id: 'DESC' } });
  }

  /** Trả null nếu không có (dùng cho JwtStrategy) */
  findById(id: number): Promise<User | null> {
    return this.userRepo.findOne({ where: { id } });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException(`Không tìm thấy người dùng #${id}`);
    return user;
  }

  /** Dùng riêng cho đăng nhập: lấy kèm password hash */
  findByEmailWithPassword(email: string): Promise<User | null> {
    return this.userRepo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email: email.trim().toLowerCase() })
      .getOne();
  }

  async create(dto: CreateUserDto): Promise<User> {
    await this.assertEmailAvailable(dto.email);

    const user = this.userRepo.create({
      fullName: dto.fullName,
      email: dto.email.trim().toLowerCase(),
      password: await bcrypt.hash(dto.password, SALT_ROUNDS),
      phone: dto.phone ?? null,
      role: dto.role ?? UserRole.CUSTOMER,
      status: dto.status ?? UserStatus.ACTIVE,
    });
    const saved = await this.userRepo.save(user);
    return this.findOne(saved.id); // đọc lại để không lộ password hash
  }

  /** Admin cập nhật bất kỳ trường nào */
  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    const { password, email, ...rest } = dto;

    if (email && email.trim().toLowerCase() !== user.email) {
      await this.assertEmailAvailable(email);
      user.email = email.trim().toLowerCase();
    }
    Object.assign(user, rest);
    if (password) user.password = await bcrypt.hash(password, SALT_ROUNDS);

    await this.userRepo.save(user);
    return this.findOne(id);
  }

  /** User tự cập nhật hồ sơ: không được đổi role / status */
  updateProfile(id: number, dto: UpdateUserDto): Promise<User> {
    const { role, status, ...safe } = dto;
    return this.update(id, safe);
  }

  async remove(id: number): Promise<{ message: string }> {
    const user = await this.findOne(id);
    await this.userRepo.remove(user);
    return { message: `Đã xóa người dùng #${id}` };
  }

  private async assertEmailAvailable(email: string): Promise<void> {
    const exists = await this.userRepo.exist({
      where: { email: email.trim().toLowerCase() },
    });
    if (exists) throw new ConflictException('Email đã được sử dụng');
  }
}
