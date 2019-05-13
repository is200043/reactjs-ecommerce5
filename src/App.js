import React, { Component } from 'react';
import { Grommet, Box } from 'grommet'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { connect } from 'react-redux'
import AppBar from './components/AppBar'
import ProductListPage from './pages/ProductListPage'
import CheckoutPage from './pages/CheckoutPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './components/PrivateRoute';

import './App.css';

class App extends Component {
  render() {
    const { isLoading } = this.props
    if (isLoading) {
      return (
        <h1>Loading...</h1>
      )
    }
    return (
      <Router>
        <Grommet plain full>
          <Box direction="column" fill>
            <AppBar />

            <Switch>
              <Route path="/" exact component={ProductListPage} />
              <Route path="/checkout" exact component={CheckoutPage} />
              <Route path="/login" exact component={LoginPage} />
              <Route path="/register" exact component={RegisterPage} />
              <PrivateRoute path="/profile" exact component={ProfilePage} />
              <Route path="**" component={() => <h1>Not Found</h1>} />
            </Switch>
          </Box>
        </Grommet>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: !state._persist.rehydrated
  }
}

export default connect(mapStateToProps)(App);
