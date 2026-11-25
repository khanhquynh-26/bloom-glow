
import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GiftSetEntity } from './entities/gift-set.entity';

import { CreateGiftSetDto } from './dto/create-gift-sets.dto';
import { UpdateGiftSetDto } from './dto/update-gift-sets.dto';

@Injectable()
export class GiftSetsService {
    constructor(
        @InjectRepository(GiftSetEntity)
        private readonly giftSetRepository: Repository<GiftSetEntity>,
    ) {}

    // Lấy tất cả set quà
    async findAll() {
        return this.giftSetRepository.find({
            order: {
                id: 'DESC',
            },
        });
    }

    // Lấy chi tiết một set quà
    async findOne(id: number) {
        const giftSet = await this.giftSetRepository.findOne({
            where: { id },
        });

        if (!giftSet) {
            throw new NotFoundException(
                'Không tìm thấy set quà',
            );
        }

        return giftSet;
    }

    // Tạo set quà mới
    async create(dto: CreateGiftSetDto) {
        const existing = await this.giftSetRepository.findOne({
            where: { slug: dto.slug },
        });

        if (existing) {
            throw new BadRequestException(
                'Slug set quà đã tồn tại',
            );
        }

        const giftSet = this.giftSetRepository.create({
            ...dto,
            price: String(dto.price),
            status: dto.status ?? 'active',
            stock: dto.stock ?? 0,
        });

        return this.giftSetRepository.save(giftSet);
    }

    // Cập nhật set quà
    async update(id: number, dto: UpdateGiftSetDto) {
        const giftSet = await this.findOne(id);

        if (dto.slug && dto.slug !== giftSet.slug) {
            const existing = await this.giftSetRepository.findOne({
                where: { slug: dto.slug },
            });

            if (existing) {
                throw new BadRequestException(
                    'Slug set quà đã tồn tại',
                );
            }
        }

        Object.assign(giftSet, {
            ...dto,
            ...(dto.price !== undefined
                ? { price: String(dto.price) }
                : {}),
        });

        return this.giftSetRepository.save(giftSet);
    }

    // Xóa set quà
    async remove(id: number) {
        const giftSet = await this.findOne(id);

        await this.giftSetRepository.remove(giftSet);

        return {
            message: 'Xóa set quà thành công',
        };
    }
}
