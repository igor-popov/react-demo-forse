import * as React from 'react';
import { ProductName } from '../../domain/product';
import { Link } from 'react-router-dom';

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
          <h2><Link to={'/produkter/' + this.props.product.id}>{this.props.product.name}</Link></h2>
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
