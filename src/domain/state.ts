import { ShoppingList } from './shoppingList';
import { Product } from './product';

export interface ShoppingListState {
  list?: ShoppingList;
}

export interface ProductsState {
  all?: Product[];
  errorMessage?: string;
}

export interface CurrentProductState {
  current?: Product;
  isJustSaved?: boolean;
  errorMessage?: string;
}

export interface AppState {
  shoppingList: ShoppingListState;
  products: ProductsState;
  product: CurrentProductState;
}
