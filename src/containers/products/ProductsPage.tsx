import * as React from 'react';
import { ProductName } from '../../domain/product';
import { ProductNameDto } from '../../dto/product';
import { productApi } from '../../api/productApi';
import ProductListItem from '../../components/products/productListItem';

interface ProductsPageProps {
  title: string;
}

interface ProductsPageState {
  products: ProductName[];
}

class ProductsPage extends React.Component<ProductsPageProps, ProductsPageState> {

    constructor(props: ProductsPageProps) {
      super(props);
      this.state = {products: []};
    }

    public componentWillMount() {
        if (!this.state.products.length) {
            productApi.getProducts().then(dtos => {
              const products =  dtos.map((dto: ProductNameDto) =>
                ({id: dto.id, name: dto.name}));
              this.setState({ products: products });
        });
      }
    }

    render(): React.ReactNode {
      return (
        <div>
          <h1>{this.props.title}</h1>
          {this.state.products.map(p => this.renderProduct(p))}
        </div>
      );
    }

    renderProduct(product: ProductName) {
      return (
        <ProductListItem product={product}/>
      );
    }
}

export default ProductsPage;
