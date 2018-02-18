import { ProductDto } from '../dto/product';

class ProductApi {
  private products: ProductDto[] = [
    {id: 'AAA123', name: 'Melk', weight: 1},
    {id: 'AAA126', name: 'Brød', weight: 0.6}
  ];

  public getProducts(): Promise<ProductDto[]> {
    return new Promise((resolve, reject) => {
      window.setInterval(
        () => {
          resolve(this.products);
        },
        1000);
    });
  }

  public upsertProduct(product: ProductDto): Promise<void> {
    return new Promise((resolve, reject) => {
      window.setInterval(
        () => {
          const existingProduct = this.products.find(p => p.id === product.id);
          if (!existingProduct) {
            this.products.push(product);
          } else {
            existingProduct.name = product.name;
            existingProduct.weight = product.weight;
          }
          resolve();
        },
        1000);
    });
  }
}

export const productApi = new ProductApi();
