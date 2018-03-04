import { combineReducers, Reducer } from 'redux';
import { AppState } from '../domain/state';
import products from './products/reducers';
import shoppingList from './shoppingList/reducers';

/*
interface DummyState {
  value?: string;
}
function dummy(state: DummyState = {}, action: any): DummyState {
  return state;
}
*/

const rootReducer: Reducer<AppState> = combineReducers({
  products,
  shoppingList
});

export default rootReducer;
