
import type { Product } from './product.types';

export interface SearchResponse {
  products: Product[];
  total: number;
  keyword: string;
}

export interface UserEventData {
  eventType:
    | 'view_product'
    | 'search'
    | 'add_to_cart'
    | 'add_to_wishlist';
  productId?: number;
  keyword?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  reply: string;
}

export interface GiftStudioRequest {
  occasion: string;
  recipient: string;
  budget: string;
  preferences?: string;
}

export interface GiftSuggestion {
  name: string;
  description: string;
  products?: Product[];
}

export interface GiftStudioResponse {
  suggestions: GiftSuggestion[];
}

export interface AnalyticsSummary {
  totalSearches: number;
  totalChats: number;
  totalRecommendations: number;
  popularKeywords: string[];
}
