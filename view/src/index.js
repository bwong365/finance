import React        from 'react';
import { render }   from 'react-dom';
import { Provider } from 'react-redux';

import configureStore    from './store';
import makeAuthenticator from './components/hoc/makeAuthenticator';
import makeResponsive    from './components/hoc/makeResponsive';

import App from './components/App';

import './index.scss';

// Initialize Redux store
const store = configureStore();

// Apply hoc
const AuthenticatedApp = makeAuthenticator(App);
const ResponsiveApp = makeResponsive(AuthenticatedApp);

render(
  <Provider store={store}>
    <div>
      <ResponsiveApp />
    </div>
  </Provider>,
  document.getElementById('root')
);