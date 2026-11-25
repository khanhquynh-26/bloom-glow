
import {
    IsInt,
    IsString,
    IsNotEmpty,
    IsOptional,
    IsBoolean,
    Min,
    MaxLength,
} from 'class-validator';

export class CreateProductImageDto {
    @IsInt()
    @Min(1)
    productId: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(500)
    imageUrl: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    altText?: string;

    @IsOptional()
    @IsBoolean()
    isPrimary?: boolean;

    @IsOptional()
    @IsInt()
    @Min(0)
    sortOrder?: number;
}
