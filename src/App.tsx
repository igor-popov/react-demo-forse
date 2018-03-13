import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, NavLink } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/scss/bootstrap.scss';
import ProductsPage from './containers/products/ProductsPage';
import ProductPage from './containers/product/ProductPage';
import ShoppingListPage from './containers/shoppingList/ShoppingListPage';

class App extends React.Component {

  render() {
    return (
      <Router>
        <div className='App'>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
              <div className='navbar-nav'>
                <NavLink to='/shoppingList' className='nav-item nav-link'>Liste</NavLink>
                <NavLink to='/produkter' className='nav-item nav-link'>Produkter</NavLink>
              </div>
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
