import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
  constructor(private readonly productsService: ProductsService ,

    @InjectRepository(User)
    private readonly userRepository : Repository<User>

  ) {}

  async runSeed() {
    await this.deleteTables();
    await this.insertNweProduct();
    
    return 'SEED EXECUTED';
  }


  private async deleteTables (){

    await this.productsService.deleteAllProducts();

    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder
    .delete()
    .where({})
    .execute()

  }


  private async insertNweProduct() {
    await this.productsService.deleteAllProducts();

    const products = initialData.products;

    const insertPromises: Promise<any>[] = [];

    //products.forEach((product) => {
      //insertPromises.push(this.productsService.create(product));
    //});

    await Promise.all(insertPromises);
    return true;
  }
}
