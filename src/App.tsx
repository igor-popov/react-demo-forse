import * as React from 'react';
import './App.css';
import ProductsPage from './containers/products/ProductsPage';

// const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ProductsPage title="Produkter"/>
      </div>
    );
  }
}

export default App;
