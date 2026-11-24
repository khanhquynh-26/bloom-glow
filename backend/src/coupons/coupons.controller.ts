import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CouponsService } from './coupons.service';

@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Post()
  create(@Body() dto: any) {
    return this.couponsService.create(dto);
  }

  @Get()
  findAll() {
    return this.couponsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.couponsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.couponsService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couponsService.remove(+id);
  }
}