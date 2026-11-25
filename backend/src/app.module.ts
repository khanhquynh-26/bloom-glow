import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AddressesModule } from './addresses/addresses.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';

import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    CategoriesModule,
    ProductsModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
    AddressesModule,
  ],
})
export class AppModule {}
