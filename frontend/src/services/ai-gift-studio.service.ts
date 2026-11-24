
import api from './api';
import type {
  GiftStudioRequest,
  GiftStudioResponse,
} from '../types/ai.types';

export const aiGiftStudioService = {
  async generateGift(
    data: GiftStudioRequest,
  ): Promise<GiftStudioResponse> {
    const response = await api.post('/ai-gift-studio/generate', data);
    return response.data;
  },
};
