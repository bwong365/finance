import React        from 'react';
import { Redirect } from 'react-router-dom';
import { compose }  from 'redux';
import { connect }  from 'react-redux';

/**
 * Higher order component which forces redirect to login
 */
const makeRequireLogin = Component => props => (
  // If toLogin is true, redirect
  (props.toLogin)
    ? <Redirect to='/login' />
    : <Component {...props} />
);

// map state to props
export default compose(connect(
  state => ({ toLogin: state.auth.toLogin })
), makeRequireLogin);