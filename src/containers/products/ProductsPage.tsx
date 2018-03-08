import * as React from 'react';
import { connect } from 'react-redux';
import { ProductName } from '../../domain/product';
import { Wait } from '../../components/shared/wait';
import ProductListItem from '../../components/products/productListItem';

import { AppState } from '../../domain/state';
import * as constants from './constants';
import { getAllProductNames } from './selectors';

import './ProductsPage.css';

interface ProductsPageProps {
  title: string;
  loadProducts: () => void;
  products: ProductName[];
}

interface ProductsPageState {

}

class ProductsPage extends React.Component<ProductsPageProps, ProductsPageState> {

    public componentWillMount() {
      if (!this.props.products || !this.props.products.length) {
          this.props.loadProducts();
      }
    }

    render(): React.ReactNode {

      if (!this.props.products || !this.props.products.length) {
        return (
          <Wait text='Loading'/>
        );
      }

      return (
        <div className='products-page'>
          <h1>{this.props.title}</h1>
          {this.props.products.map(p => this.renderProduct(p))}
        </div>
      );
    }

    renderProduct(product: ProductName) {
      return (
        <ProductListItem product={product} key={product.id}/>
      );
    }
}

function mapStateToProps(state: AppState) {
    return {
       products: getAllProductNames(state)
    };
}

function mapDispatchToProps(dispatch: Function) {
    return {
      loadProducts: () => dispatch({type: constants.ALL_PRODUCTS_REQUEST_START})
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductsPage);
