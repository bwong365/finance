// Dependencies
import React, { Component }      from 'react';
import { connect }               from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom'
import createBrowserHistory      from 'history/createBrowserHistory'

// Components
import Home          from './pages/home/Home'
import Login         from './pages/login/LoginPage'
import Register      from './pages/register/RegistrationPage'
import NotFound      from './pages/not-found/NotFound'
import Nav from './nav/Nav'
import Buy from './pages/buy/Buy';
import Logout from './pages/logout/Logout'

import { appClass, flex, main } from './App.module.scss'

import requireLogin from '../components/hoc/requireLogin'
const history = createBrowserHistory();

// Apply HOCs outside render
const protectedHome = requireLogin(Home);
const protectedBuy = requireLogin(Buy);

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className={appClass}>
          {this.props.authenticating ? (
            <div>This is a loading screen</div>
          ) : (
            <div className={flex}>
              {this.props.username.length > 0 && <Nav />}
              <div className={main}>
                <Switch>
                  <Route exact path='/' component={protectedHome} />
                  <Route path='/buy' component={protectedBuy} />
                  {/*<Route path='/quote' component={requireLogin(Quote)} />}
                <Route path='/sell' component={requireLogin(Sell)} />*/}
                  <Route path='/register' component={Register} />
                  <Route path='/login' component={Login} />
                  <Route path='/logout' component={Logout} />
                  <Route path='*' component={NotFound} />
                </Switch>
              </div>
            </div>
          )}
        </div>
      </Router>
    );
  }
}

export default connect(
  state => ({
    authenticating: state.auth.authenticating,
    expanded: state.expanded,
    username: state.auth.username
  })
)(App);
