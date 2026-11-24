import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ParsePositiveIntPipe } from '../common/pipes/parse-int.pipe';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('addresses')
@UseGuards(JwtAuthGuard)
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Get()
  findAll(@CurrentUser('id') userId: number) {
    return this.addressesService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParsePositiveIntPipe) id: number, @CurrentUser('id') userId: number) {
    return this.addressesService.findOne(id, userId);
  }

  @Post()
  create(@CurrentUser('id') userId: number, @Body() dto: CreateAddressDto) {
    return this.addressesService.create(userId, dto);
  }

  @Patch(':id/default')
  setDefault(@Param('id', ParsePositiveIntPipe) id: number, @CurrentUser('id') userId: number) {
    return this.addressesService.setDefault(id, userId);
  }

  @Patch(':id')
  update(
    @Param('id', ParsePositiveIntPipe) id: number,
    @CurrentUser('id') userId: number,
    @Body() dto: UpdateAddressDto,
  ) {
    return this.addressesService.update(id, userId, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParsePositiveIntPipe) id: number, @CurrentUser('id') userId: number) {
    return this.addressesService.remove(id, userId);
  }
}
