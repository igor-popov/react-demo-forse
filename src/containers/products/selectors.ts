import { createSelector } from 'reselect';

import { ProductName } from '../../domain/product';
import { AppState } from '../../domain/state';

const getAllProducts = (state: AppState) => state.products.all || [];
export const getAllProductNames = createSelector([getAllProducts], (products) => {
  const productNames: ProductName[] = products.map(p => ({id: p.id, name: p.name}));
  return productNames;
});
