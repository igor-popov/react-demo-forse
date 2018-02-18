import { ShoppingListDto } from '../dto/shoppingList';

class ShoppingListApi {
  private shoppingList: ShoppingListDto = {id: 'ABC123', name: 'Min liste', entries: []};

  public getShoppingList(): Promise<ShoppingListDto> {
    return new Promise((resolve, reject) => {
      window.setInterval(
        () => {
          resolve(this.shoppingList);
        },
        1000);
    });
  }

}

export const shoppingListApi = new ShoppingListApi();
