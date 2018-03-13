import { call, put, takeLatest, fork, all } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as constants from './constants';
import { SINGLE_PRODUCT_UPDATED } from '../products/constants';

import { ProductDto } from '../../dto/product';
import { Product } from '../../domain/product';
import { productApi } from '../../api/productApi';

function requestProductFromApi(id: string): Promise<Product> {
  return productApi.getProduct(id).then(dto => {
    const product: Product =  {id: dto.id, name: dto.name, weight: dto.weight};
    return product;
  });
}

function* loadProduct(action: any) {
  try {
    const product: Product = yield call(requestProductFromApi, action.productId);
    yield put({type: constants.PRODUCT_REQUEST_SUCCEEDED, product: product});
  } catch (e) {
    yield put({type: constants.PRODUCT_REQUEST_FAILED, message: e.message});
  }
}

function saveProductUsingApi(product: Product): Promise<any> {
  const dto: ProductDto = {id: product.id, name: product.name, weight: product.weight};
  return productApi.upsertProduct(dto);
}

function* saveProduct(action: any) {
  try {
    const product: Product = action.product;
    yield call(saveProductUsingApi, action.product);
    yield put({type: constants.PRODUCT_SAVE_SUCCEEDED, product: product});
    yield put({type: SINGLE_PRODUCT_UPDATED, product: product});
    yield call(delay, 2000);
    yield put({type: constants.PRODUCT_SAVE_SUCCEEDED_A_WHILE_AGO, product: product});
  } catch (e) {
    yield put({type: constants.PRODUCT_SAVE_FAILED, message: e.message});
  }
}

function* getProduct() {
  yield takeLatest(constants.PRODUCT_REQUEST_START, loadProduct);
}

function* upsertProduct() {
  yield takeLatest(constants.PRODUCT_SAVE_START, saveProduct);
}

function* root() {
  yield all([
       fork(getProduct),
       fork(upsertProduct)
   ]);
}

export default root;
