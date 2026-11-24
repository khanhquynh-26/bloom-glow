import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { CreateCartsDto } from './dto/create-carts.dto';
import { UpdateCartsDto } from './dto/update-carts.dto';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepo: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepo: Repository<CartItem>,
  ) {}

  async getCartByUser(userId: number): Promise<Cart> {
    let cart = await this.cartRepo.findOne({
      where: { userId },
      relations: ['items'],
    });
    if (!cart) {
      cart = this.cartRepo.create({ userId, items: [] });
      await this.cartRepo.save(cart);
    }
    return cart;
  }

  async addToCart(dto: CreateCartsDto): Promise<Cart> {
    const cart = await this.getCartByUser(dto.userId);
    const existingItem = cart.items.find(
      (item) => item.productVariantId === dto.productVariantId,
    );

    if (existingItem) {
      existingItem.quantity += dto.quantity;
      await this.cartItemRepo.save(existingItem);
    } else {
      const newItem = this.cartItemRepo.create({
        cartId: cart.id,
        productVariantId: dto.productVariantId,
        quantity: dto.quantity,
      });
      await this.cartItemRepo.save(newItem);
    }
    return this.getCartByUser(dto.userId);
  }

  async updateItemQuantity(itemId: number, dto: UpdateCartsDto): Promise<CartItem> {
    const item = await this.cartItemRepo.findOne({ where: { id: itemId } });
    if (!item) {
      throw new NotFoundException(`Không tìm thấy sản phẩm #${itemId} trong giỏ`);
    }
    item.quantity = dto.quantity;
    return this.cartItemRepo.save(item);
  }

  async removeItem(itemId: number): Promise<void> {
    const item = await this.cartItemRepo.findOne({ where: { id: itemId } });
    if (!item) {
      throw new NotFoundException(`Không tìm thấy sản phẩm #${itemId} trong giỏ`);
    }
    await this.cartItemRepo.remove(item);
  }

  async clearCart(userId: number): Promise<void> {
    const cart = await this.getCartByUser(userId);
    if (cart.items.length > 0) {
      await this.cartItemRepo.remove(cart.items);
    }
  }
}