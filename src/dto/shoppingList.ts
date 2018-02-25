import { ProductNameDto } from './product';

export interface ShoppingEntryDto {
  product: ProductNameDto;
  amount: number;
}

export interface ShoppingListDto {
  id: string;
  name: string;
  entries: ShoppingEntryDto[];
}
