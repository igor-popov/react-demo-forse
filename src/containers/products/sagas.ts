import { call, put, takeLatest } from 'redux-saga/effects';
import * as constants from './constants';

import { ProductDto } from '../../dto/product';
import { Product } from '../../domain/product';
import { productApi } from '../../api/productApi';

function requestProductsFromApi(): Promise<Product[]> {
  return productApi.getProductsWithWeight().then(dtos => {
    const products: Product[] =  dtos.map((dto: ProductDto) =>
      ({id: dto.id, name: dto.name, weight: dto.weight}));
    return products;
  });
}

function* loadAllProducts() {
  try {
    const products: Product[] = yield call(requestProductsFromApi);
    yield put({type: constants.ALL_PRODUCTS_REQUEST_SUCCEEDED, products: products});
  } catch (e) {
    yield put({type: constants.ALL_PRODUCTS_REQUEST_FAILED, message: e.message});
  }
}

function* main() {
  yield takeLatest(constants.ALL_PRODUCTS_REQUEST_START, loadAllProducts);
}

export default main;
