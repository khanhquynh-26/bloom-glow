
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

import { CollectionsService } from './collections.service';

import { CreateCollectionDto } from './dto/create-collections.dto';
import { UpdateCollectionDto } from './dto/update-collections.dto';

@Controller('collections')
export class CollectionsController {
    constructor(
        private readonly collectionsService: CollectionsService,
    ) {}

    // Lấy tất cả bộ sưu tập
    @Get()
    findAll() {
        return this.collectionsService.findAll();
    }

    // Lấy chi tiết bộ sưu tập
    @Get(':id')
    findOne(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.collectionsService.findOne(id);
    }

    // Tạo bộ sưu tập
    @Post()
    create(@Body() dto: CreateCollectionDto) {
        return this.collectionsService.create(dto);
    }

    // Cập nhật bộ sưu tập
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateCollectionDto,
    ) {
        return this.collectionsService.update(id, dto);
    }

    // Xóa bộ sưu tập
    @Delete(':id')
    remove(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.collectionsService.remove(id);
    }
}
