import { ProductDto, ProductNameDto } from '../dto/product';

class ProductApi {
  private products: ProductDto[] = [
    {id: 'AAA123', name: 'Melk', weight: 1},
    {id: 'AAA126', name: 'Brød', weight: 0.6},
    {id: 'AAA128', name: 'Ketchup', weight: 1.5}
  ];

  public getProducts(): Promise<ProductNameDto[]> {
    return new Promise((resolve, reject) => {
      window.setInterval(
        () => {
          resolve(this.products.map(p => ({name: p.name, id: p.id})));
        },
        1000);
    });
  }

  public getProductsWithWeight(): Promise<ProductDto[]> {
    return new Promise((resolve, reject) => {
      window.setInterval(
        () => {
          resolve(this.products.map(p => ({name: p.name, id: p.id, weight: p.weight})));
        },
        1000);
    });
  }

  public getProduct(id: string): Promise<ProductDto> {
    return new Promise((resolve, reject) => {
      window.setInterval(
        () => {
          const product: ProductDto|undefined = this.products.filter(p => p.id === id).pop();
          if (!product) {
            reject(new Error(`Produkt finnes ikke for id ${id}`));
          }
          resolve(product);
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
