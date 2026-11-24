
import api from './api';
import type { UserEventData } from '../types/ai.types';

export const userEventsService = {
  async trackEvent(data: UserEventData) {
    try {
      await api.post('/user-events', data);
    } catch (error) {
      // Không để lỗi ghi nhận hành vi làm gián đoạn thao tác mua hàng
      console.error('Không thể ghi nhận hành vi:', error);
    }
  },
};
