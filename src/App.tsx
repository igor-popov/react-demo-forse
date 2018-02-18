import * as React from 'react';
import './App.css';
import ProductsPage from './containers/products/ProductsPage';

// const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ProductsPage title="Ikke så mye"/>
      </div>
    );
  }
}

export default App;
