import { ProductName } from './product';

export interface ShoppingEntry {
  product: ProductName;
  amount: number;
}

export interface ShoppingList {
  id: string;
  name: string;
  entries: ShoppingEntry[];
}
