import {
    Injectable,
    NotFoundException,
    ConflictException,
    BadRequestException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductsRepository } from './products.repository';
import { ProductEntity } from './entities/product.entity';

import { CategoryEntity } from '../categories/entities/category.entity';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductDto } from './dto/query-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        private readonly productsRepository: ProductsRepository,

        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>,
    ) {}

    async findAll() {
        return this.productsRepository.findAll();
    }

    async findMany(query: QueryProductDto) {
        return this.productsRepository.findMany(query);
    }

    async findOne(id: number) {
        const product = await this.productsRepository.findById(id);

        if (!product) {
            throw new NotFoundException('Không tìm thấy sản phẩm');
        }

        return product;
    }

    async create(dto: CreateProductDto) {
        const existingProduct =
            await this.productsRepository.findBySlug(dto.slug);

        if (existingProduct) {
            throw new ConflictException('Slug sản phẩm đã tồn tại');
        }

        const category = await this.categoryRepository.findOne({
            where: {
                id: dto.categoryId,
            },
        });

        if (!category) {
            throw new BadRequestException('Danh mục không tồn tại');
        }

        const product = this.productsRepository.create({
            ...dto,
            status: dto.status || 'active',
        });

        return this.productsRepository.save(product);
    }

    async update(id: number, dto: UpdateProductDto) {
        const product = await this.findOne(id);

        if (dto.slug && dto.slug !== product.slug) {
            const existingProduct =
                await this.productsRepository.findBySlug(dto.slug);

            if (existingProduct) {
                throw new ConflictException('Slug sản phẩm đã tồn tại');
            }
        }

        if (dto.categoryId !== undefined) {
            const category = await this.categoryRepository.findOne({
                where: {
                    id: dto.categoryId,
                },
            });

            if (!category) {
                throw new BadRequestException('Danh mục không tồn tại');
            }
        }

        Object.assign(product, dto);

        return this.productsRepository.save(product);
    }

    async remove(id: number) {
        const product = await this.findOne(id);

        await this.productsRepository.remove(product);

        return {
            message: 'Xóa sản phẩm thành công',
        };
    }
}