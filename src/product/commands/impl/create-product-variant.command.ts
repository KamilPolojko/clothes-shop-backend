import { createProductDTO } from '../dto/create-product.dto';

export class CreateProductCommand {
  constructor(public readonly productDto: createProductDTO) {}
}
