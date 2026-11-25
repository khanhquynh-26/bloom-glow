import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { ProductEntity } from './entities/product.entity';
import { CategoryEntity } from '../categories/entities/category.entity';

describe('ProductsService', () => {
    let service: ProductsService;

    const productsRepositoryMock = {
        findAll: jest.fn(),
        findMany: jest.fn(),
        findById: jest.fn(),
        findBySlug: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
        remove: jest.fn(),
    };

    const categoryRepositoryMock = {
        findOne: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductsService,
                {
                    provide: ProductsRepository,
                    useValue: productsRepositoryMock,
                },
                {
                    provide: getRepositoryToken(CategoryEntity),
                    useValue: categoryRepositoryMock,
                },
            ],
        }).compile();

        service = module.get<ProductsService>(ProductsService);

        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return all products', async () => {
        const products = [
            {
                id: 1,
                name: 'Hoa hồng đỏ',
                price: '250000',
            },
        ];

        productsRepositoryMock.findAll.mockResolvedValue(products);

        const result = await service.findAll();

        expect(result).toEqual(products);
    });

    it('should throw NotFoundException when product does not exist', async () => {
        productsRepositoryMock.findById.mockResolvedValue(null);

        await expect(service.findOne(999)).rejects.toThrow(
            'Không tìm thấy sản phẩm',
        );
    });
});