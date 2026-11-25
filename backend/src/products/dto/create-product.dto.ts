import {
    IsString,
    IsNotEmpty,
    IsInt,
    IsIn,
    IsOptional,
    IsUrl,
    MaxLength,
    Min,
    Matches,
} from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    slug: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @Matches(/^\d+$/, {
        message: 'price phải là chuỗi số nguyên không âm',
    })
    price: string;

    @IsInt()
    @Min(0)
    stock: number;

    @IsInt()
    @Min(1)
    categoryId: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(500)
    imageUrl: string;

    @IsOptional()
    @IsIn(['active', 'inactive'])
    status?: 'active' | 'inactive';
}