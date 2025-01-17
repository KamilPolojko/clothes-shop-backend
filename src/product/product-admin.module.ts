import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Product } from './entities/product.entity';
import { ProductAdminController } from './product-admin.controller';
import { ProductService } from './product.service';
import { ProductVariant } from './entities/product-variant.entity';
import { CreateProductCommandHandler } from './commands/handler/create-product-command.handler';
import { AzureService } from '../azure-blob-storage/azure.service';
import { AzureModule } from '../azure-blob-storage/azure.module';
import { CreateProductVariantCommandHandler } from './commands/handler/create-product-variant-command.handler';
import { ProductVariantService } from './product-variant.service';
import { ProductClientController } from './product-client.controller';
import { GetProductsQueryHandler } from './queries/handler/get-products-query.handler';

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
