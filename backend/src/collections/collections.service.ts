
import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CollectionEntity } from './entities/collection.entity';

import { CreateCollectionDto } from './dto/create-collections.dto';
import { UpdateCollectionDto } from './dto/update-collections.dto';

@Injectable()
export class CollectionsService {
    constructor(
        @InjectRepository(CollectionEntity)
        private readonly collectionRepository: Repository<CollectionEntity>,
    ) {}

    // Lấy tất cả bộ sưu tập
    async findAll() {
        return this.collectionRepository.find({
            order: {
                sortOrder: 'ASC',
                id: 'DESC',
            },
        });
    }

    // Lấy chi tiết một bộ sưu tập
    async findOne(id: number) {
        const collection = await this.collectionRepository.findOne({
            where: { id },
        });

        if (!collection) {
            throw new NotFoundException(
                'Không tìm thấy bộ sưu tập',
            );
        }

        return collection;
    }

    // Tạo bộ sưu tập mới
    async create(dto: CreateCollectionDto) {
        const existing = await this.collectionRepository.findOne({
            where: { slug: dto.slug },
        });

        if (existing) {
            throw new BadRequestException(
                'Slug bộ sưu tập đã tồn tại',
            );
        }

        const collection = this.collectionRepository.create({
            ...dto,
            status: dto.status ?? 'active',
            sortOrder: dto.sortOrder ?? 0,
        });

        return this.collectionRepository.save(collection);
    }

    // Cập nhật bộ sưu tập
    async update(id: number, dto: UpdateCollectionDto) {
        const collection = await this.findOne(id);

        if (dto.slug && dto.slug !== collection.slug) {
            const existing = await this.collectionRepository.findOne({
                where: { slug: dto.slug },
            });

            if (existing) {
                throw new BadRequestException(
                    'Slug bộ sưu tập đã tồn tại',
                );
            }
        }

        Object.assign(collection, dto);

        return this.collectionRepository.save(collection);
    }

    // Xóa bộ sưu tập
    async remove(id: number) {
        const collection = await this.findOne(id);

        await this.collectionRepository.remove(collection);

        return {
            message: 'Xóa bộ sưu tập thành công',
        };
    }
}
