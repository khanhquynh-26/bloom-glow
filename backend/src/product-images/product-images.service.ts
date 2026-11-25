
import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductImageEntity } from './entities/product-image.entity';
import { ProductEntity } from '../products/entities/product.entity';

import { CreateProductImageDto } from './dto/create-product-images.dto';
import { UpdateProductImageDto } from './dto/update-product-images.dto';

@Injectable()
export class ProductImagesService {
    constructor(
        @InjectRepository(ProductImageEntity)
        private readonly imageRepository: Repository<ProductImageEntity>,

        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
    ) {}

    // Lấy danh sách ảnh theo sản phẩm
    async findByProduct(productId: number) {
        const product = await this.productRepository.findOne({
            where: { id: productId },
        });

        if (!product) {
            throw new NotFoundException('Không tìm thấy sản phẩm');
        }

        return this.imageRepository.find({
            where: { productId },
            order: {
                sortOrder: 'ASC',
                id: 'ASC',
            },
        });
    }

    // Thêm ảnh mới
    async create(dto: CreateProductImageDto) {
        const product = await this.productRepository.findOne({
            where: { id: dto.productId },
        });

        if (!product) {
            throw new NotFoundException('Không tìm thấy sản phẩm');
        }

        if (dto.isPrimary) {
            await this.imageRepository.update(
                { productId: dto.productId, isPrimary: true },
                { isPrimary: false },
            );
        }

        const image = this.imageRepository.create({
            ...dto,
            isPrimary: dto.isPrimary ?? false,
            sortOrder: dto.sortOrder ?? 0,
        });

        return this.imageRepository.save(image);
    }

    // Cập nhật ảnh
    async update(id: number, dto: UpdateProductImageDto) {
        const image = await this.imageRepository.findOne({
            where: { id },
        });

        if (!image) {
            throw new NotFoundException('Không tìm thấy ảnh sản phẩm');
        }

        if (dto.isPrimary === true) {
            await this.imageRepository.update(
                { productId: image.productId, isPrimary: true },
                { isPrimary: false },
            );
        }

        Object.assign(image, dto);

        return this.imageRepository.save(image);
    }

    // Xóa ảnh
    async remove(id: number) {
        const image = await this.imageRepository.findOne({
            where: { id },
        });

        if (!image) {
            throw new NotFoundException('Không tìm thấy ảnh sản phẩm');
        }

        await this.imageRepository.remove(image);

        return {
            message: 'Xóa ảnh sản phẩm thành công',
        };
    }
}
