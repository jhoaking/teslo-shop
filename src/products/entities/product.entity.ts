import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { ProductImage } from './products-images.entity';
import { User } from '../../auth/entities/user.entity';



@Entity({ name: 'products' })
export class Product {
  @ApiProperty({
    example : '3ab142df-db79-4f00-9cb6-9f80f103c143',
    description : 'Product ID',
    uniqueItems : true
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;


  
  @ApiProperty({
    example : 'T-Shirt Teslo',
    description : 'Product Title',
    uniqueItems : true
  })
  @Column('text', {
    unique: true,
  })
  title: string;

  @ApiProperty({
    example : 0,
    description : 'Product Price',
    
  })
  @Column('float', {
    default: 0,
  })
  price: number;

  @ApiProperty({
    example : 'Anum reprenhidt nulla  in anim molllit minim irure commodo',
    description : 'Description Product',
    default : null
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @ApiProperty({
    example : 't-shirt teslo',
    description : 'Product Slug - for SEO',
    uniqueItems : true
  })
  @Column('text', {
    unique: true,
  })
  slug: string;

  @ApiProperty({
    example : 10,
    description : 'Product Stock ',
    default: 0
  })
  @Column('int', {
    default: 0,
  })
  stock: number;

  @ApiProperty({
    example : ['M' , 'L' , 'XL'],
    description : 'Product Sizes'
  })
  @Column('text', {
    array: true,
  })
  sizes: string[];

  @ApiProperty({
    example : 'women',
    description : 'Product Gender'
  })
  @Column('text')
  gender: string;

  @ApiProperty({
    description : 'Product Tags',
    example : ['Shirt']
  })
  @Column('text', {
    array: true,
    default: [],
  })
  tags: string[];

  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @ManyToOne(() => User, (user) => user.product, { eager: true })
  user: User;

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }
    this.slug = this.slug
      .toLocaleLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }

  //@BeforeUpdate()
  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.slug
      .toLocaleLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}
