import {
    IsString,
    IsInt,
    IsIn,
    IsOptional,
    MaxLength,
    Min,
    Matches,
} from 'class-validator';

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    @MaxLength(255)
    name?: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    slug?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    @Matches(/^\d+$/)
    price?: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    stock?: number;

    @IsOptional()
    @IsInt()
    @Min(1)
    categoryId?: number;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    imageUrl?: string;

    @IsOptional()
    @IsIn(['active', 'inactive'])
    status?: 'active' | 'inactive';
}