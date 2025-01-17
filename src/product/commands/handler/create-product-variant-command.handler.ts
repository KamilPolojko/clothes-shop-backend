import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from '../impl/create-product.command';
import { ProductService } from '../../product.service';

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(private readonly productService: ProductService) {}

  async execute({ productDto }: CreateProductCommand) {
    await this.productService.createProduct(productDto);
  }
}
