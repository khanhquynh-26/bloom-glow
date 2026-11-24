import { Injectable } from '@nestjs/common';
import { UserEventsService } from '../user-events/user-events.service';

export class AnalyticsOverviewDto {
  totalProducts!: number;
  totalEvents!: number;
  totalOrders!: number;
  eventBreakdown!: Record<string, number>;
  generatedAt!: string;
}

@Injectable()
export class AnalyticsService {
  constructor(private readonly userEventsService: UserEventsService) {}

  getOverview(totalProducts = 0, totalOrders = 0): AnalyticsOverviewDto {
    const events = this.userEventsService.findAll();
    const eventBreakdown = events.reduce<Record<string, number>>((acc, ev) => {
      acc[ev.eventType] = (acc[ev.eventType] || 0) + 1;
      return acc;
    }, {});

    return {
      totalProducts,
      totalEvents: events.length,
      totalOrders,
      eventBreakdown,
      generatedAt: new Date().toISOString(),
    };
  }
}