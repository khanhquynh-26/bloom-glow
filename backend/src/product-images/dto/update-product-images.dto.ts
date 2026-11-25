
import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsBoolean,
    IsInt,
    Min,
    MaxLength,
} from 'class-validator';

export class UpdateProductImageDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(500)
    imageUrl?: string;

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
