import { ProductsState } from '../../domain/state';
import { Product } from '../../domain/product';
import * as constants from './constants';

export default function products(state: ProductsState = {}, action: any): ProductsState {
  let newState: ProductsState = state;
  switch (action.type) {
    case constants.ALL_PRODUCTS_REQUEST_START:
      newState = Object.assign({}, state, {all: []});
      return newState;
    case constants.ALL_PRODUCTS_REQUEST_SUCCEEDED:
      newState = Object.assign({}, state, {all: action.products});
      return newState;
    case constants.ALL_PRODUCTS_REQUEST_FAILED:
      newState = Object.assign({}, state, {errorMessage: action.message});
      return newState;
    case constants.SINGLE_PRODUCT_UPDATED:
        let updatedProduct: Product = Object.assign({}, action.product);
        let newProducts: Product[] = state.all
          ? state.all.map(p => p.id === updatedProduct.id ? updatedProduct : p)
          : [];
        newState = Object.assign({}, state, {all: newProducts});
        return newState;
    default:
      return state;
  }
}
