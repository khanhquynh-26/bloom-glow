export class CreateReviewsDto {
  userId: number;
  productId: number;
  rating: number;
  comment?: string;
}