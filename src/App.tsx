import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import './App.css';
import ProductsPage from './containers/products/ProductsPage';
import ProductPage from './containers/products/ProductPage';
import ShoppingListPage from './containers/shoppingList/ShoppingListPage';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='App'>
            <nav>
              <Link to='/shoppingList'>Liste</Link>
              <Link to='/produkter'>Produkter</Link>
            </nav>
            <Switch>
              <Route path='/shoppingList' component={ShoppingListPage}/>
              <Route exact={true} path='/produkter' component={ProductsPage}/>
              <Route path='/produkter/:id' component={ProductPage}/>
              <Redirect to='/shoppingList'/>
            </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
