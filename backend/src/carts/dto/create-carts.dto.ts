import { IsInt, Min } from 'class-validator';

export class CreateCartsDto {
  @IsInt()
  @Min(1)
  userId: number;

  @IsInt()
  @Min(1)
  productVariantId: number;

  @IsInt()
  @Min(1)
  quantity: number;
}