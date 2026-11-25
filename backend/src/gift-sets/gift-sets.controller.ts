
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

import { GiftSetsService } from './gift-sets.service';

import { CreateGiftSetDto } from './dto/create-gift-sets.dto';
import { UpdateGiftSetDto } from './dto/update-gift-sets.dto';

@Controller('gift-sets')
export class GiftSetsController {
    constructor(
        private readonly giftSetsService: GiftSetsService,
    ) {}

    // Lấy tất cả set quà
    @Get()
    findAll() {
        return this.giftSetsService.findAll();
    }

    // Lấy chi tiết set quà
    @Get(':id')
    findOne(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.giftSetsService.findOne(id);
    }

    // Tạo set quà
    @Post()
    create(@Body() dto: CreateGiftSetDto) {
        return this.giftSetsService.create(dto);
    }

    // Cập nhật set quà
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateGiftSetDto,
    ) {
        return this.giftSetsService.update(id, dto);
    }

    // Xóa set quà
    @Delete(':id')
    remove(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.giftSetsService.remove(id);
    }
}
