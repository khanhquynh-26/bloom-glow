import { IsInt, IsOptional, IsString } from 'class-validator';

export class ChatDto {
  @IsString()
  message!: string;

  @IsOptional()
  @IsInt()
  userId?: number;
}