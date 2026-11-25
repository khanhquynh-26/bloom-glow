
import api from './api';

export interface ChatRequest {
  message: string;
  userId?: number;
}

export interface AssistantProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  stock: number;
  categoryId: number;
  imageUrl: string;
  status: 'active' | 'inactive';
}

export interface ChatResponse {
  userId?: number;
  reply: string;
  suggestedProducts: AssistantProduct[];
  timestamp: string;
}

export const aiAssistantService = {
  async sendMessage(data: ChatRequest): Promise<ChatResponse> {
    const response = await api.post<ChatResponse>(
      '/ai-assistant/chat',
      data,
    );

    return response.data;
  },
};
