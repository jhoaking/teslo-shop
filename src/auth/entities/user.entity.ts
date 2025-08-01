import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../products/entities';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({
    example : '3ab142df-db79-4f00-9cb6-9f80f103c143',
    description : 'User ID',
    uniqueItems : true
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

   @ApiProperty({
    example : 'Test1@google.com',
    description : 'User Email',
    uniqueItems : true
  })
  @Column('text', {
    unique: true,
  })
  email: string;

   @ApiProperty({
    example : 'Abc123',
    description : 'User Password',
  })
  @Column('text', {
    select: false,
  })
  password: string;

   @ApiProperty({
    example : 'Joaquin Peredo',
    description : 'User Name',
  })
  @Column('text')
  fullName: string;

   @ApiProperty({
    example : true,
    description : 'User is Active',
    default : true
  })
  @Column('bool', {
    default: true,
  })
  isActive: boolean;

   @ApiProperty({
    example : ['user','admin','super-user'],
    description : 'User Role',
    default : 'user'
  })
  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @OneToMany(
    () => Product,
    (product) => product.user
  )
  product : Product

  @BeforeInsert()
  checkFieldBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldBeforeUpdate() {
    this.checkFieldBeforeInsert();
  }
}
