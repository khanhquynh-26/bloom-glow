import { Controller, Get } from '@nestjs/common';
import { AnalyticsOverviewDto, AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('overview')
  getOverview(): AnalyticsOverviewDto {
    return this.analyticsService.getOverview();
  }
}