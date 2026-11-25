import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsIn,
    IsInt,
    Min,
    MaxLength,
} from 'class-validator';

export class UpdateCollectionDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    slug?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    imageUrl?: string;

    @IsOptional()
    @IsString()
    @IsIn(['active', 'inactive'])
    status?: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    sortOrder?: number;
}
