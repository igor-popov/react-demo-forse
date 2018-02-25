
import * as React from 'react';

interface PropertyProps {
    children?: any;
    text: string;
}

interface PropertyState {
}

export class Property extends React.Component<PropertyProps, PropertyState> {
  render() {
      return (
          <div>
            <div>
                <span>{this.props.text}</span>
            </div>
            <div>
                {this.props.children}
            </div>
          </div>
      );
  }
}
