import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

import { Store } from 'redux';
import { Provider } from 'react-redux';

import { AppState } from './domain/state';
import configureStore from './containers/store';

const store: Store<AppState> = configureStore({ products: {}, shoppingList: {}});

ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
