import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBody, ApiConsumes, ApiExtraModels } from '@nestjs/swagger';
import { createProductDTO } from './commands/dto/create-product.dto';
import {
  createProductVariantDto,
  ShoeSizeDto,
  TopSizeDto,
} from './commands/dto/create-product-variant.dto';
import { CreateProductCommand } from './commands/impl/create-product.command';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductVariantCommand } from './commands/impl/create-product-variant.command';

@ApiExtraModels(TopSizeDto, ShoeSizeDto)
@Controller('/admin')
export class ProductAdminController {
  constructor(
    private readonly queryBus: QueryBus,
    private commandBus: CommandBus,
  ) {}

  @Post('/create-product')
  @ApiConsumes('application/x-www-form-urlencoded')
  async createProduct(@Body() productDto: createProductDTO) {
    await this.commandBus.execute(new CreateProductCommand(productDto));
  }

  @Post('/create-product-variant')
  @UseInterceptors(FileInterceptor('photo'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        productCode: { type: 'string', example: 'AB1234' },
        variantName: { type: 'string', example: 'Red T-Shirt' },
        sizeType: { type: 'string', enum: ['top', 'shoe'], example: 'top' },
        topDetails: {
          type: 'string', // Może być też obiekt zależnie od tego, jak to implementujesz
          example: '{"size": "M", "color": "blue"}',
        },
        shoeDetails: {
          type: 'Object',
          example: { size: 42, material: 'leather' },
        },
        photo: {
          type: 'string',
          format: 'binary', // Plik, który będzie uploadowany
        },
      },
    },
  })
  async createProductVariant(
    @Body() sizeDto: createProductVariantDto,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    // if (sizeDto.sizeType === 'top' && sizeDto.topDetails) {
    //   const details =
    //     typeof sizeDto.topDetails === 'string'
    //       ? JSON.parse(sizeDto.topDetails)
    //       : sizeDto.topDetails;
    //   const { sizeType, productCode, variantName } = sizeDto;
    //   return {
    //     productCode,
    //     variantName,
    //     sizeType,
    //     details,
    //   };
    // } else if (sizeDto.sizeType === 'shoe' && sizeDto.shoeDetails) {
    //   const details =
    //     typeof sizeDto.shoeDetails === 'string'
    //       ? JSON.parse(sizeDto.shoeDetails)
    //       : sizeDto.shoeDetails;
    //   const { sizeType, productCode, variantName } = sizeDto;
    //   return {
    //     productCode,
    //     variantName,
    //     sizeType,
    //     details,
    //   };
    // }

    await this.commandBus.execute(
      new CreateProductVariantCommand(sizeDto, photo),
    );
  }
}
