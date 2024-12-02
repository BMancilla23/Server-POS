import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    // Config Module for Environment Variables
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // TypeOrm Module for Database Connection
    TypeOrmModule.forRootAsync({
      useFactory: TypeOrmConfig,
      inject: [ConfigService],
    }),
    CategoriesModule,
    ProductsModule,
  ],
  providers: [
    // Global Validation Pipe provider
    {
      provide: 'APP_PIPE',
      useFactory: () => ({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
  ],
})
export class AppModule {}
