import { ProductsState } from '../../domain/state';
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
    default:
      return state;
  }
}
