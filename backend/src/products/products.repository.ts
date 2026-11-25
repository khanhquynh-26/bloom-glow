import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    Repository,
    Like,
    FindOptionsWhere,
} from 'typeorm';

import { ProductEntity } from './entities/product.entity';
import { QueryProductDto } from './dto/query-product.dto';

@Injectable()
export class ProductsRepository {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly repository: Repository<ProductEntity>,
    ) {}

    findAll() {
        return this.repository.find({
            relations: ['category'],
            order: {
                id: 'DESC',
            },
        });
    }

    findById(id: number) {
        return this.repository.findOne({
            where: { id },
            relations: ['category'],
        });
    }

    findBySlug(slug: string) {
        return this.repository.findOne({
            where: { slug },
        });
    }

    async findMany(query: QueryProductDto) {
        const page = query.page || 1;
        const limit = query.limit || 10;

        const where: FindOptionsWhere<ProductEntity> = {};

        if (query.keyword) {
            where.name = Like(`%${query.keyword}%`);
        }

        if (query.categoryId) {
            where.categoryId = query.categoryId;
        }

        if (query.status) {
            where.status = query.status;
        }

        const [items, total] = await this.repository.findAndCount({
            where,
            relations: ['category'],
            order: {
                id: 'DESC',
            },
            skip: (page - 1) * limit,
            take: limit,
        });

        return {
            items,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    create(data: Partial<ProductEntity>) {
        return this.repository.create(data);
    }

    save(product: ProductEntity) {
        return this.repository.save(product);
    }

    remove(product: ProductEntity) {
        return this.repository.remove(product);
    }
}