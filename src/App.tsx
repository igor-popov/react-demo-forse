import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import ProductsPage from './containers/products/ProductsPage';
import ProductPage from './containers/products/ProductPage';

// const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <Router>
          <Switch>
            <Route exact={true} path='/produkter' component={ProductsPage}/>
            <Route path='/produkter/:id' component={ProductPage}/>
            <Redirect to='/produkter'/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
