// Dependencies
import React                     from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { connect }               from 'react-redux';
import createBrowserHistory      from 'history/createBrowserHistory';
import makeRequireLogin          from '../components/hoc/makeRequireLogin';

// Components
import Buy           from './pages/buy/Buy';
import Home          from './pages/home/Home';
import Loader        from './Loader';
import Login         from './pages/login/LoginPage';
import Logout        from './pages/logout/Logout';
import Nav           from './nav/Nav';
import NotFound      from './pages/not-found/NotFound';
import Register      from './pages/register/RegistrationPage';
import Sell          from './pages/sell/Sell';

// Style
import { spacer, appClass, flex, main } from './App.module.scss';

const history = createBrowserHistory();

// Apply HOCs outside render
const protectedHome = makeRequireLogin(Home);
const protectedBuy  = makeRequireLogin(Buy);
const protectedSell = makeRequireLogin(Sell);

const App = props => {
  const { username, authenticating } = props;
  
  return (
    <Router history={history}>
      <div className={appClass}>
        {
            authenticating ? (
              <div className={spacer}>
                <Loader />
              </div>
            ) : (
              <div className={flex}>
                {username.length > 0 && <Nav />}
                <div className={main}>
                  <Switch>
                    <Route exact path='/' component={protectedHome} />
                    <Route path='/buy' component={protectedBuy} />
                    <Route path='/sell' component={protectedSell} />*/}
                    <Route path='/register' component={Register} />
                    <Route path='/login' component={Login} />
                    <Route path='/logout' component={Logout} />
                    <Route path='*' component={NotFound} />
                  </Switch>
                </div>
              </div>
            )
        }
      </div>
    </Router>
  );
}

// Map state to props
export default connect(
  state => ({
    authenticating: state.auth.authenticating,
    expanded: state.expanded,
    username: state.auth.username
  })
)(App);
