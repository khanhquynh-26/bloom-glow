import { Controller, Get, Query } from '@nestjs/common';
import { SearchProduct, SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  findProducts(
    @Query('keyword') keyword?: string,
    @Query('categoryId') categoryId?: string,
    @Query('maxPrice') maxPrice?: string,
  ): SearchProduct[] {
    return this.searchService.search({
      keyword,
      categoryId: categoryId ? Number(categoryId) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });
  }
}