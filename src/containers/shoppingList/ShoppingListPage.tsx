import * as React from 'react';
import { ShoppingList, ShoppingEntry } from '../../domain/shoppingList';
import { ShoppingListDto, ShoppingEntryDto } from '../../dto/shoppingList';
import { Product } from '../../domain/product';
import { ProductDto } from '../../dto/product';
import { productApi } from '../../api/productApi';
import { shoppingListApi } from '../../api/shoppingListApi';

import { ShoppingListProductControl } from '../../components/shoppingList/shoppingListProduct';
import { ShoppingListProductsControl } from '../../components/shoppingList/shoppingListProducts';

import { Wait } from '../../components/shared/wait';
import { SaveButton } from '../../components/shared/saveButton';

interface ShoppingListPageProps {
}

interface ShoppingListPageState {
  products?: Product[];
  shoppingList?: ShoppingList;
  isSaved: boolean;
}

interface ProductEntry {
  product: Product;
  shoppingEntry: ShoppingEntry;
}

class ShoppingListPage extends React.Component<ShoppingListPageProps, ShoppingListPageState> {

    private onAmountChangedMethod: (entry: ShoppingEntry, newAmount: number) => void;
    private onSaveMethod: () => void;

    constructor(props: ShoppingListPageProps) {
      super(props);
      this.onAmountChangedMethod = this.onAmountChanged.bind(this);
      this.onSaveMethod = this.onSave.bind(this);
      this.state = {isSaved: false};
    }

    public componentWillMount() {

        if (!this.state.shoppingList) {
            shoppingListApi.getShoppingList().then((dto: ShoppingListDto) => {
              const shoppingList: ShoppingList =  {
                id: dto.id,
                name: dto.name,
                entries: dto.entries.map((e: ShoppingEntryDto) =>
                ({product: {id: e.product.id, name: e.product.name}, amount: e.amount}))
              };

              const newState = Object.assign({}, this.state, {shoppingList});
              this.setState(newState);
            });
        }

        if (!this.state.products) {
          productApi.getProductsWithWeight().then((dtos: ProductDto[]) => {

            const products: Product[] = dtos.map((dto: ProductDto) =>
              ({id: dto.id, name: dto.name, weight: dto.weight})
            );

            const newState = Object.assign({}, this.state, {products});
            this.setState(newState);
          });
        }
    }

    render(): React.ReactNode {

      const products = this.state.products;
      const shoppingList = this.state.shoppingList;

      if (!products || !shoppingList) {
        return (
          <Wait text='Loading'/>
        );
      }

      let productEntries: ProductEntry[] =
        products.map(p => ({
          product: p,
          shoppingEntry: shoppingList.entries.find(e => e.product.id === p.id) || {product: p, amount: 0}
        }));

      let totalWeight: number = productEntries
        .reduce(
          (prev, curr) =>
          prev + curr.product.weight * curr.shoppingEntry.amount,
          0
        );

      return (
        <div>
          <h1>{shoppingList.name}</h1>
          <ShoppingListProductsControl>
            {productEntries.map(e => this.renderProductEntry(e))}
          </ShoppingListProductsControl>
          <p>Total weight: {totalWeight}</p>
          <SaveButton onClick={this.onSaveMethod}/>
          {this.state.isSaved ? <p>Saved!</p> : undefined}
        </div>
      );
    }

    private renderProductEntry(productEntry: ProductEntry) {
      return (
        <ShoppingListProductControl
          onAmountChanged={this.onAmountChangedMethod}
          entry={productEntry.shoppingEntry}
        />
      );
    }

    private onAmountChanged(entry: ShoppingEntry, newAmount: number): void {

      if (!this.state.shoppingList) {
        return;
      }

      const shoppingList: ShoppingList = this.state.shoppingList;

      const newEntry: ShoppingEntry = {product: entry.product, amount: newAmount};
      const newEntries = shoppingList.entries
        .map(
          e => e.product.id === entry.product.id ? newEntry : e
        );

      if (!newEntries.find(e => e.product.id === entry.product.id)) {
        newEntries.push(newEntry);
      }

      let newShoppingList = {
        id: shoppingList.id,
        name: shoppingList.name,
        entries: newEntries
      };

      const newState = Object.assign({}, this.state, {shoppingList: newShoppingList});
      this.setState(newState);
    }

    private onSave() {

      if (!this.state.products) {
        throw new Error('Products are missing');
      }

      if (!this.state.shoppingList) {
        throw new Error('Shopping list is missing');
      }

      const shoppingList = this.state.shoppingList;
      const dto: ShoppingListDto = {
        id: shoppingList.id,
        name: shoppingList.name,
        entries:  shoppingList.entries.map((e: ShoppingEntry) =>
        ({product: {id: e.product.id, name: e.product.name}, amount: e.amount}))
      };

      shoppingListApi.saveShoppingList(dto).then(() => {
        const newState = Object.assign({}, this.state, {isSaved: true});
        this.setState(newState);
        window.setInterval(
          () => this.hideIsSavedNotification(),
          2000);

      });
    }

    private hideIsSavedNotification() {
      const newState = Object.assign({}, this.state, {isSaved: false});
      this.setState(newState);
    }
}

export default ShoppingListPage;
