import { createStore, applyMiddleware, Store, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';

import { AppState } from '../domain/state';

export default function configureStore(initialState: AppState): Store<AppState> {
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers = (<any> window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store: Store<AppState> =
    createStore<AppState>(
      rootReducer,
      initialState,
      composeEnhancers(applyMiddleware(sagaMiddleware))
    );

  return store;
}
