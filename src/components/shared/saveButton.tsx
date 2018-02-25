import * as React from 'react';

export interface SaveButtonProperties {
  onClick: () => void;
}

export class SaveButton extends React.Component<SaveButtonProperties, any> {
  private _onClick: () => void;

  public componentWillMount() {
    this._onClick = !!this.props.onClick ? this.props.onClick.bind(this) : () => void(0);
  }

  public render() {
      return (
            <button onClick={this._onClick}>
                Lagre
             </button>
           );
  }
}
