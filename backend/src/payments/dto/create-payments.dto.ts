import { IsInt, IsEnum, IsOptional, IsString, Min } from 'class-validator';
import { PaymentMethod } from '../entities/payment.entity';

export class CreatePaymentsDto {
  @IsInt()
  @Min(1)
  orderId: number;

  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @IsInt()
  @Min(0)
  amount: number;

  @IsString()
  @IsOptional()
  transactionId?: string;
}