import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartsDto } from './dto/create-carts.dto';
import { UpdateCartsDto } from './dto/update-carts.dto';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get('user/:userId')
  getCart(@Param('userId', ParseIntPipe) userId: number) {
    return this.cartsService.getCartByUser(userId);
  }

  @Post('items')
  addToCart(@Body() dto: CreateCartsDto) {
    return this.cartsService.addToCart(dto);
  }

  @Patch('items/:itemId')
  updateQuantity(
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() dto: UpdateCartsDto,
  ) {
    return this.cartsService.updateItemQuantity(itemId, dto);
  }

  @Delete('items/:itemId')
  removeItem(@Param('itemId', ParseIntPipe) itemId: number) {
    return this.cartsService.removeItem(itemId);
  }

  @Delete('user/:userId')
  clearCart(@Param('userId', ParseIntPipe) userId: number) {
    return this.cartsService.clearCart(userId);
  }
}