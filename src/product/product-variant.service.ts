import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Product } from './entities/product.entity';
import { createProductDTO } from './commands/dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  generateProductCode(): string {
    // Generowanie dwóch losowych wielkich liter
    const letters = String.fromCharCode(
      Math.floor(Math.random() * 26) + 65, // Pierwsza litera (A-Z)
      Math.floor(Math.random() * 26) + 65, // Druga litera (A-Z)
    );

    // Generowanie czterech losowych cyfr
    const digits = Math.floor(1000 + Math.random() * 9000); // Zakres 1000-9999
    return letters + digits;
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOneById(id: string): Promise<Product | null> {
    return await this.productRepository.findOneBy({ id });
  }

  async findOneByProductCode(productCode: string): Promise<Product | null> {
    return await this.productRepository.findOneBy({ productCode });
  }

  async createProduct(dto: createProductDTO) {
    const allProducts = await this.findAll();
    let generatedProductCode;
    for (;;) {
      generatedProductCode = this.generateProductCode();
      if (!allProducts.includes(generatedProductCode)) {
        break;
      } else {
        generatedProductCode = [];
      }
    }
    return await this.productRepository.save({
      id: uuidv4(),
      productCode: generatedProductCode,
      ...dto,
    });
  }

  //
  // async updateProduct(productCode: string) {
  //   const product = await this.
  // }

  async remove(id: string): Promise<void> {
    const product = await this.findOneById(id);

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    await this.productRepository.remove(product);
  }
}
