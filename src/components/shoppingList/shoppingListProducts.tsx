import * as React from 'react';

interface ShoppingListProductsControlProps {
  children?: any;
}

interface ShoppingListProductsControlState {
}

export class ShoppingListProductsControl extends
  React.Component<ShoppingListProductsControlProps, ShoppingListProductsControlState> {

    render(): React.ReactNode {

      return (
        <table className='table'>
          <thead>
            <tr>
              <th>Produkt</th>
              <th>Mengde</th>
            </tr>
          </thead>
          <tbody>
            {this.props.children}
          </tbody>
        </table>
      );
    }
}
