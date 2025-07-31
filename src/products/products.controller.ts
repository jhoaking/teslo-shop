import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Product } from './entities';

import { Auth, GetUser } from '../auth/Decorator';
import { ValidRoles } from '../auth/interfaces';
import { User } from '../auth/entities/user.entity';


@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}


  @Post()
  @Auth()
  @ApiResponse({status : 201 , description: 'Product was created',type : Product})
  @ApiResponse({status : 400 , description: 'Bad Request'})
  @ApiResponse({status : 403 , description: 'Forbidden. Roken Related'})
  create(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user:User

) {
    return this.productsService.create(createProductDto,user);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @Get(':term')
  @ApiResponse({ status: 200, type: Product })
  @ApiResponse({ status: 400,description : ' product not found ' , type: Product })
  findOne(@Param('term') term: string) {
    return this.productsService.findOnePlain(term);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
     @GetUser() user:User
  ) {
    return this.productsService.update(id, updateProductDto,user);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
