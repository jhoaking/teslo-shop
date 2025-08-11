import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product Title ( unique ) ',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty({
    description: 'Product Price',
    default: 0,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'Product Description',
    example: 'Anum reprenhidt nulla  in anim molllit minim irure commodo',
    nullable: true,
    default: null,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 't-shirt teslo',
    description: 'Product Slug - for SEO',
    uniqueItems: true,
  })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({
    description: 'Product Stock',
    example: 10,
    default: 0,
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @ApiProperty({
    description: 'Product Sizes',
    example: ['M', 'XL', 'L'],  
  })
  @IsString({ each: true })
  @IsArray()
  sizes: string[];

  @ApiProperty({
    description: 'Product Gender',
    example: 'Men',
  })
  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;

  @ApiProperty({
    description: 'Product Tags',
    example: ['Hoodie'],
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags: string[];

  @ApiProperty({
    description : 'Product images',
    example : ['1740176-00-A_0_2000.jpg','1740176-00-A_0_2004.jpg']
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];
}
