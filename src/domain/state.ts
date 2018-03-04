import { ShoppingList } from './shoppingList';
import { Product } from './product';

export interface ShoppingListState {
  list?: ShoppingList;
}

export interface ProductsState {
  all?: Product[];
  current?: Product;
}

export interface AppState {
  shoppingList: ShoppingListState;
  products: ProductsState;
}
