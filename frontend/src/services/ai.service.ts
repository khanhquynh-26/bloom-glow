
import api from './api';
import type { Product } from '../types';

export interface AIChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface GiftRecommendationRequest {
  occasion: string;
  recipient: string;
  budget: string;
  style: string;
}

export interface GiftRecommendationResponse {
  message: string;
  products: Product[];
}

const aiService = {
  async chat(
    messages: AIChatMessage[],
  ): Promise<AIChatMessage> {
    const response = await api.post<AIChatMessage>(
      '/ai-assistant/chat',
      { messages },
    );

    return response.data;
  },

  async recommendGifts(
    data: GiftRecommendationRequest,
  ): Promise<GiftRecommendationResponse> {
    const response = await api.post<GiftRecommendationResponse>(
      '/recommendations/gifts',
      data,
    );

    return response.data;
  },
};

export default aiService;
