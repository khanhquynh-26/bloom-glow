
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';

import { AddressesModule } from './addresses/addresses.module';
import { AiAssistantModule } from './ai-assistant/ai-assistant.module';
import { AiGiftStudioModule } from './ai-gift-studio/ai-gift-studio.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { AuthModule } from './auth/auth.module';
import { CartsModule } from './carts/carts.module';
import { CouponsModule } from './coupons/coupons.module';
import { InventoryModule } from './inventory/inventory.module';
import { NotificationsModule } from './notifications/notifications.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { RecommendationsModule } from './recommendations/recommendations.module';
import { ReviewsModule } from './reviews/reviews.module';
import { SearchModule } from './search/search.module';
import { UserEventsModule } from './user-events/user-events.module';
import { UsersModule } from './users/users.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Database
    DatabaseModule,

    // Products and categories
    CategoriesModule,
    ProductsModule,

    // Users and authentication
    UsersModule,
    AuthModule,

    // Business modules
    AddressesModule,
    CartsModule,
    OrdersModule,
    PaymentsModule,
    WishlistsModule,
    CouponsModule,
    InventoryModule,
    ReviewsModule,
    NotificationsModule,

    // AI modules
    AiAssistantModule,
    AiGiftStudioModule,

    // Other modules
    AnalyticsModule,
    RecommendationsModule,
    SearchModule,
    UserEventsModule,
  ],
})
export class AppModule {}
