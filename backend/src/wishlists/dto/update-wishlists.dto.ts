import { PartialType } from '@nestjs/mapped-types';
import { CreateWishlistsDto } from './create-wishlists.dto';

export class UpdateWishlistsDto extends PartialType(CreateWishlistsDto) {}