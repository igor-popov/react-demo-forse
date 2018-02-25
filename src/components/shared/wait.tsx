import * as React from 'react';

interface WaitProps {
  text: string;
}

interface WaitState {
}

export class Wait extends React.Component<WaitProps, WaitState> {

    render(): React.ReactNode {
      return (
        <div>
          {this.props.text}...
        </div>
      );
    }
}
