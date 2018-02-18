import { ProductName } from './product';

export interface ShoppingEntry {
  products: ProductName;
  amount: number;
}

export interface ShoppingList {
  id: string;
  name: string;
  totalWeight: number;
  entries: ShoppingEntry[];
}
