import { Injectable } from '@nestjs/common';
import { Product } from './product.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  async getAll(): Promise<Product[]> {
    return this.productModel.findAll();
  }
  async getOne(id: number): Promise<Product> {
    return this.productModel.findByPk(id);
  }
  async create(product: Product) {
    return this.productModel.create(product);
  }
  async update(product: Product): Promise<[number, Product[]]> {
    return this.productModel.update(product, {
      where: {
        id: product.id,
      },
    });
  }
  async delete(id: number) {
    const product: Product = await this.getOne(id);
    product.destroy();
  }
}
