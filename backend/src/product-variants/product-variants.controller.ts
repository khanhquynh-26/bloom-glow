
import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    ParseIntPipe,
} from '@nestjs/common';

import { ProductVariantsService } from './product-variants.service';

import { CreateProductVariantDto } from './dto/create-product-variants.dto';
import { UpdateProductVariantDto } from './dto/update-product-variants.dto';

@Controller('product-variants')
export class ProductVariantsController {
    constructor(
        private readonly productVariantsService: ProductVariantsService,
    ) {}

    @Get()
    findAll() {
        return this.productVariantsService.findAll();
    }

    @Get('product/:productId')
    findByProduct(
        @Param('productId', ParseIntPipe) productId: number,
    ) {
        return this.productVariantsService.findByProduct(productId);
    }

    @Get(':id')
    findOne(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.productVariantsService.findOne(id);
    }

    @Post()
    create(@Body() dto: CreateProductVariantDto) {
        return this.productVariantsService.create(dto);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateProductVariantDto,
    ) {
        return this.productVariantsService.update(id, dto);
    }

    @Delete(':id')
    remove(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.productVariantsService.remove(id);
    }
}
