import { IsInt, Min } from 'class-validator';

export class UpdateCartsDto {
  @IsInt()
  @Min(1)
  quantity: number;
}