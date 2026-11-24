import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrdersDto } from './dto/create-orders.dto';
import { UpdateOrdersDto } from './dto/update-orders.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,
  ) {}

  async create(dto: CreateOrdersDto): Promise<Order> {
    if (!dto.items || dto.items.length === 0) {
      throw new BadRequestException('Đơn hàng phải có ít nhất 1 sản phẩm');
    }

    const totalAmount = dto.items.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0,
    );

    const orderCode = `BG-${Date.now()}`;

    const order = this.orderRepo.create({
      orderCode,
      userId: dto.userId,
      recipientName: dto.recipientName,
      recipientPhone: dto.recipientPhone,
      shippingAddress: dto.shippingAddress,
      note: dto.note,
      totalAmount,
      status: OrderStatus.PENDING,
      items: dto.items.map((item) =>
        this.orderItemRepo.create({
          productVariantId: item.productVariantId,
          productName: item.productName,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        }),
      ),
    });

    return this.orderRepo.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepo.find({
      relations: ['items'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByUser(userId: number): Promise<Order[]> {
    return this.orderRepo.find({
      where: { userId },
      relations: ['items'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['items'],
    });
    if (!order) {
      throw new NotFoundException(`Không tìm thấy đơn hàng #${id}`);
    }
    return order;
  }

  async update(id: number, dto: UpdateOrdersDto): Promise<Order> {
    const order = await this.findOne(id);
    Object.assign(order, dto);
    return this.orderRepo.save(order);
  }
}