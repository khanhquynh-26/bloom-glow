
import {
    IsInt,
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    IsIn,
    Min,
    MaxLength,
} from 'class-validator';

export class CreateProductVariantDto {
    @IsInt()
    @Min(1)
    productId: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    sku?: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    price: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    stock?: number;

    @IsOptional()
    @IsString()
    @IsIn(['active', 'inactive'])
    status?: string;
}
