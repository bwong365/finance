import React from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';

const requireLogin = Component => props => (
  props.toLogin
    ? <Redirect to='/login' />
    : <Component {...props} />
)

export default compose(connect(
  state => ({ toLogin: state.auth.toLogin })
), requireLogin);