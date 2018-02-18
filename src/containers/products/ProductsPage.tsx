import * as React from 'react';
import { Product } from '../../domain/product';
import { ProductDto } from '../../dto/product';
import { productApi } from '../../api/productApi';

interface ProductsPageProps {
  title: string;
}

interface ProductsPageState {
  products: Product[];
}

class ProductsPage extends React.Component<ProductsPageProps, ProductsPageState> {

    constructor(props: ProductsPageProps) {
      super(props);
      this.state = {products: []};
    }

    public componentWillMount() {
        if (!this.state.products.length) {
            productApi.getProducts().then(dtos => {
              const products =  dtos.map((dto: ProductDto) =>
                ({id: dto.id, name: dto.name, weight: dto.weight}));
              this.setState({ products: products });
        });
      }
    }

    render(): React.ReactNode {
      return (
        <div>
          Min status er:
          <p>{this.props.title}</p>
        </div>
      );
    }
}

export default ProductsPage;
