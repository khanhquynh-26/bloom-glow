import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductImageEntity } from './entities/product-image.entity';
import { ProductEntity } from '../products/entities/product.entity';

import { ProductImagesController } from './product-images.controller';
import { ProductImagesService } from './product-images.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProductImageEntity,
            ProductEntity,
        ]),
    ],
    controllers: [
        ProductImagesController,
    ],
    providers: [
        ProductImagesService,
    ],
    exports: [
        ProductImagesService,
    ],
})
export class ProductImagesModule {}
