import { SagaMiddleware } from 'redux-saga';
import { fork, all } from 'redux-saga/effects';
import { AppState } from '../domain/state';

import products from './products/sagas';
import product from './product/sagas';
// import shoppingList from './shoppingList/sagas';

function* rootSaga() {
  yield all ([
       fork(products),
       fork(product)
   ]);
}

export function startSagas(sagaMiddleware: SagaMiddleware<AppState>) {
  sagaMiddleware.run(rootSaga);
}
