import {
    Injectable,
    NotFoundException,
    ConflictException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoryEntity } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>,
    ) {}

    async findAll(): Promise<CategoryEntity[]> {
        return this.categoryRepository.find({
            order: {
                id: 'DESC',
            },
        });
    }

    async findOne(id: number): Promise<CategoryEntity> {
        const category = await this.categoryRepository.findOne({
            where: { id },
        });

        if (!category) {
            throw new NotFoundException('Không tìm thấy danh mục');
        }

        return category;
    }

    async create(
        createCategoryDto: CreateCategoryDto,
    ): Promise<CategoryEntity> {
        const existing = await this.categoryRepository.findOne({
            where: [
                { name: createCategoryDto.name },
                { slug: createCategoryDto.slug },
            ],
        });

        if (existing) {
            throw new ConflictException(
                'Tên hoặc slug danh mục đã tồn tại',
            );
        }

        const category = this.categoryRepository.create(
            createCategoryDto,
        );

        return this.categoryRepository.save(category);
    }

    async update(
        id: number,
        updateCategoryDto: UpdateCategoryDto,
    ): Promise<CategoryEntity> {
        const category = await this.findOne(id);

        if (updateCategoryDto.name) {
            const existingName = await this.categoryRepository.findOne({
                where: { name: updateCategoryDto.name },
            });

            if (existingName && existingName.id !== id) {
                throw new ConflictException('Tên danh mục đã tồn tại');
            }
        }

        if (updateCategoryDto.slug) {
            const existingSlug = await this.categoryRepository.findOne({
                where: { slug: updateCategoryDto.slug },
            });

            if (existingSlug && existingSlug.id !== id) {
                throw new ConflictException('Slug danh mục đã tồn tại');
            }
        }

        Object.assign(category, updateCategoryDto);

        return this.categoryRepository.save(category);
    }

    async remove(id: number): Promise<{ message: string }> {
        const category = await this.categoryRepository.findOne({
            where: { id },
            relations: ['products'],
        });

        if (!category) {
            throw new NotFoundException('Không tìm thấy danh mục');
        }

        if (category.products?.length > 0) {
            throw new ConflictException(
                'Không thể xóa danh mục đang có sản phẩm',
            );
        }

        await this.categoryRepository.remove(category);

        return {
            message: 'Xóa danh mục thành công',
        };
    }
}