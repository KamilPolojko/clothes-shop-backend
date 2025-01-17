import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { AzureModule } from '../../azure-blob-storage/azure.module';
import { Product } from '../entities/product.entity';
import { ProductVariant } from '../entities/product-variant.entity';


@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Product, ProductVariant]),
    AzureModule,
  ],
  controllers: [ProductAdminController, ProductClientController],
  providers: [
    ProductService,
    ProductVariantService,
    AzureService,
    CreateProductCommandHandler,
    CreateProductVariantCommandHandler,
    GetProductsQueryHandler,
  ],
  exports: [ProductService],
})
export class ProductModule {}
