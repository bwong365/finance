// Dependencies
import React, { Component }      from 'react';
import { connect }               from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom'
import createBrowserHistory      from 'history/createBrowserHistory'

// Components
import Home          from './pages/Home'
import Login         from './pages/login/LoginPage'
import Register      from './pages/register/RegistrationPage'
import NotFound      from './pages/not-found/NotFound'


import requireLogin  from '../components/hoc/requireLogin'
const history = createBrowserHistory();

class App extends Component {  
  render() {
    return (
      <Router history={history}>
          { this.props.authenticating ? (
            <div>This is a loading screen</div>
          ) : (
            <div>
              {/*<Nav /> */}
              <main>
                <Switch>
                  <Route exact path='/' component={requireLogin(Home)} />
                  {/*<Route path='/quote' component={requireLogin(Quote)} />}
                  <Route path='/buy' component={requireLogin(Buy)} />
                  <Route path='/sell' component={requireLogin(Sell)} />*/}
                  <Route path='/register' component={Register} />
                  <Route path='/login' component={Login} />
                  <Route path='*' component={NotFound} />
                </Switch>
              </main>
            </div>
          ) }
      </Router>
    );
  }
}

export default connect(
  state => ({
    authenticating: state.auth.authenticating,
    expanded: state.expanded
  })
)(App);
