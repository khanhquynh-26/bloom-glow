
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

import { ProductImagesService } from './product-images.service';

import { CreateProductImageDto } from './dto/create-product-images.dto';
import { UpdateProductImageDto } from './dto/update-product-images.dto';

@Controller('product-images')
export class ProductImagesController {
    constructor(
        private readonly productImagesService: ProductImagesService,
    ) {}

    // Lấy danh sách ảnh theo sản phẩm
    @Get('product/:productId')
    findByProduct(
        @Param('productId', ParseIntPipe) productId: number,
    ) {
        return this.productImagesService.findByProduct(productId);
    }

    // Thêm ảnh mới
    @Post()
    create(@Body() dto: CreateProductImageDto) {
        return this.productImagesService.create(dto);
    }

    // Cập nhật ảnh
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateProductImageDto,
    ) {
        return this.productImagesService.update(id, dto);
    }

    // Xóa ảnh
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.productImagesService.remove(id);
    }
}
