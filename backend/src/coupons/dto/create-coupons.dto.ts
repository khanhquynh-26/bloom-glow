export class CreateCouponsDto {
  code: string;
  discountAmount: number;
  isActive?: boolean;
  expiresAt?: Date;
}