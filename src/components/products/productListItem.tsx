import * as React from 'react';
import { ProductName } from '../../domain/product';

interface ProductsListItemProps {
  product: ProductName;
}

interface ProductsListItemState {
}

class ProductsListItem extends React.Component<ProductsListItemProps, ProductsListItemState> {

    render(): React.ReactNode {

      let styles: any = this.getStyles();

      return (
        <div style={styles} className={'product-list-item'}>
          <h2>{this.props.product.name}</h2>
        </div>
      );
    }

    getStyles(): any {
      switch (this.props.product.name) {
        case 'Ketchup':
          return {color: 'red', fontStyle: 'italic'};
        default:
          return {color: '#111111'};
      }
    }
}

export default ProductsListItem;
