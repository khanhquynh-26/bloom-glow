import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ProductVariantsModule } from './product-variants/product-variants.module';
import { ProductImagesModule } from './product-images/product-images.module';
import { CollectionsModule } from './collections/collections.module';
import { GiftSetsModule } from './gift-sets/gift-sets.module';
import { CartsModule } from './carts/carts.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { CouponsModule } from './coupons/coupons.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { InventoryModule } from './inventory/inventory.module';
import { ReviewsModule } from './reviews/reviews.module';
import { SearchModule } from './search/search.module';
import { UserEventsModule } from './user-events/user-events.module';
import { RecommendationsModule } from './recommendations/recommendations.module';
import { AiAssistantModule } from './ai-assistant/ai-assistant.module';
import { AiGiftStudioModule } from './ai-gift-studio/ai-gift-studio.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { NotificationsModule } from './notifications/notifications.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AddressesModule } from './addresses/addresses.module';

@Module({
  imports: [ProductsModule, ProductVariantsModule, ProductImagesModule, CollectionsModule, GiftSetsModule, CartsModule, WishlistsModule, CouponsModule, OrdersModule, PaymentsModule, InventoryModule, ReviewsModule, SearchModule, UserEventsModule, RecommendationsModule, AiAssistantModule, AiGiftStudioModule, AnalyticsModule, NotificationsModule, CategoriesModule, AuthModule, UsersModule, AddressesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
