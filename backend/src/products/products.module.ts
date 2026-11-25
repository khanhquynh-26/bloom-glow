import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';

import { ProductEntity } from './entities/product.entity';
import { CategoryEntity } from '../categories/entities/category.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProductEntity,
            CategoryEntity,
        ]),
    ],
    controllers: [
        ProductsController,
    ],
    providers: [
        ProductsService,
        ProductsRepository,
    ],
    exports: [
        ProductsService,
    ],
})
export class ProductsModule {}