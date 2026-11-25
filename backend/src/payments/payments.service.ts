import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentStatus } from './entities/payment.entity';
import { CreatePaymentsDto } from './dto/create-payments.dto';
import { UpdatePaymentsDto } from './dto/update-payments.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
  ) {}

  async create(dto: CreatePaymentsDto): Promise<Payment> {
    const existing = await this.paymentRepo.findOne({
      where: { orderId: dto.orderId },
    });
    if (existing) {
      throw new BadRequestException(
        `Đơn hàng #${dto.orderId} đã có thông tin thanh toán rồi`,
      );
    }

    const payment = this.paymentRepo.create({
      orderId: dto.orderId,
      paymentMethod: dto.paymentMethod,
      amount: dto.amount,
      transactionId: dto.transactionId,
      status: PaymentStatus.PENDING,
    });

    return this.paymentRepo.save(payment);
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentRepo.find({ order: { createdAt: 'DESC' } });
  }

  async findByOrder(orderId: number): Promise<Payment> {
    const payment = await this.paymentRepo.findOne({ where: { orderId } });
    if (!payment) {
      throw new NotFoundException(
        `Không tìm thấy thanh toán của đơn hàng #${orderId}`,
      );
    }
    return payment;
  }

  async update(id: number, dto: UpdatePaymentsDto): Promise<Payment> {
    const payment = await this.paymentRepo.findOne({ where: { id } });
    if (!payment) {
      throw new NotFoundException(`Không tìm thấy giao dịch #${id}`);
    }

    if (dto.status) {
      payment.status = dto.status;
      if (dto.status === PaymentStatus.COMPLETED && !payment.paidAt) {
        payment.paidAt = new Date();
      }
    }

    if (dto.transactionId !== undefined) {
      payment.transactionId = dto.transactionId;
    }

    return this.paymentRepo.save(payment);
  }
}