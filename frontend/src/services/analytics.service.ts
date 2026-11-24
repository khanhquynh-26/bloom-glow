
import api from './api';
import type { AnalyticsSummary } from '../types/ai.types';

export const analyticsService = {
  async getSummary(): Promise<AnalyticsSummary> {
    const response = await api.get('/analytics/summary');
    return response.data;
  },
};
