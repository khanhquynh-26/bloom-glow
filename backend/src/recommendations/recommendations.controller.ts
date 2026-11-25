import { Controller, Get, Param, Query } from '@nestjs/common';
import { RecommendProduct, RecommendationsService } from './recommendations.service';

@Controller('recommendations')
export class RecommendationsController {
  constructor(private readonly recommendationsService: RecommendationsService) {}

  @Get('personal')
  getPersonal(@Query('userId') userId?: string): RecommendProduct[] {
    return this.recommendationsService.getPersonalRecommendations(userId ? Number(userId) : 1);
  }

  @Get('related/:productId')
  getRelated(@Param('productId') productId: string): RecommendProduct[] {
    return this.recommendationsService.getRelatedProducts(Number(productId));
  }
}