import * as React from 'react';
import { ShoppingEntry } from '../../domain/shoppingList';
import { NumberEditor } from '../../components/shared/numberEditor';

interface ShoppingListProductControlProps {
  entry: ShoppingEntry;
  onAmountChanged: (entry: ShoppingEntry, newAmount: number) => void;
}

interface ShoppingListProductControlState {
}

export class ShoppingListProductControl
  extends React.Component<ShoppingListProductControlProps, ShoppingListProductControlState> {

    // private onAmountChangedHandler: (change: any) => any = this.onChange.bind(this);

    constructor(props: ShoppingListProductControlProps) {
      super(props);
    }

    render(): React.ReactNode {

      return (
        <tr>
          <td>
            {this.props.entry.product.name}
          </td>
          <td>
            <NumberEditor
              value={this.props.entry.amount}
              placeholder='mengde'
              onChange={(change) => this.onChange(change)}
            />
          </td>
        </tr>
      );
    }

    onChange(change: any): any {
      this.props.onAmountChanged(this.props.entry, change);
    }
}
