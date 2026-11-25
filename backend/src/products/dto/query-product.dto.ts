import {
    IsOptional,
    IsString,
    IsInt,
    IsIn,
    Min,
} from 'class-validator';

import { Type } from 'class-transformer';

export class QueryProductDto {
    @IsOptional()
    @IsString()
    keyword?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    categoryId?: number;

    @IsOptional()
    @IsIn(['active', 'inactive'])
    status?: 'active' | 'inactive';

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number = 10;
}