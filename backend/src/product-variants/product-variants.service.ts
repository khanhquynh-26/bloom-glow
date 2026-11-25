
import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductVariantEntity } from './entities/product-variant.entity';
import { ProductEntity } from '../products/entities/product.entity';

import { CreateProductVariantDto } from './dto/create-product-variants.dto';
import { UpdateProductVariantDto } from './dto/update-product-variants.dto';

@Injectable()
export class ProductVariantsService {
    constructor(
        @InjectRepository(ProductVariantEntity)
        private readonly variantRepository: Repository<ProductVariantEntity>,

        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
    ) { }

    async findAll() {
        return this.variantRepository.find({
            relations: ['product'],
            order: { id: 'DESC' },
        });
    }

    async findByProduct(productId: number) {
        const product = await this.productRepository.findOne({
            where: { id: productId },
        });

        if (!product) {
            throw new NotFoundException('Không tìm thấy sản phẩm');
        }

        return this.variantRepository.find({
            where: { productId },
            order: { id: 'ASC' },
        });
    }

    async findOne(id: number) {
        const variant = await this.variantRepository.findOne({
            where: { id },
            relations: ['product'],
        });

        if (!variant) {
            throw new NotFoundException('Không tìm thấy biến thể sản phẩm');
        }

        return variant;
    }

    async create(dto: CreateProductVariantDto) {
        const product = await this.productRepository.findOne({
            where: { id: dto.productId },
        });

        if (!product) {
            throw new NotFoundException('Không tìm thấy sản phẩm');
        }

        if (dto.sku) {
            const existing = await this.variantRepository.findOne({
                where: { sku: dto.sku },
            });

            if (existing) {
                throw new BadRequestException('Mã SKU đã tồn tại');
            }
        }

        const variant = this.variantRepository.create({
            ...dto,
            price: String(dto.price),
            stock: dto.stock ?? 0,
            status: dto.status ?? 'active',
        });

        return this.variantRepository.save(variant);
    }

    async update(id: number, dto: UpdateProductVariantDto) {
        const variant = await this.findOne(id);

        if (dto.sku && dto.sku !== variant.sku) {
            const existing = await this.variantRepository.findOne({
                where: { sku: dto.sku },
            });

            if (existing) {
                throw new BadRequestException('Mã SKU đã tồn tại');
            }
        }

        Object.assign(variant, dto);

        return this.variantRepository.save(variant);
    }

    async remove(id: number) {
        const variant = await this.findOne(id);

        await this.variantRepository.remove(variant);

        return {
            message: 'Xóa biến thể sản phẩm thành công',
        };
    }
}
