import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductVariantEntity } from './entities/product-variant.entity';
import { ProductEntity } from '../products/entities/product.entity';

import { ProductVariantsController } from './product-variants.controller';
import { ProductVariantsService } from './product-variants.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProductVariantEntity,
            ProductEntity,
        ]),
    ],
    controllers: [
        ProductVariantsController,
    ],
    providers: [
        ProductVariantsService,
    ],
    exports: [
        ProductVariantsService,
    ],
})
export class ProductVariantsModule {}
