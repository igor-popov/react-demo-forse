import { SagaMiddleware } from 'redux-saga';
import { AppState } from '../domain/state';

import products from './products/sagas';
// import shoppingList from './shoppingList/sagas';

export function startSagas(sagaMiddleware: SagaMiddleware<AppState>) {
  sagaMiddleware.run(products);
}
