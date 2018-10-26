import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { toLogin }          from '../../../actions/authActions';

import FormContainer from '../../form/FormContainer';
import LoginForm from './LoginForm';

// Contains login form
class LoginPage extends Component {
  componentDidMount() {
    this.props.toLogin(false);
  }

  componentDidUpdate() {
    this.props.toLogin(false);
  }

  render() {
    return (
      <FormContainer heading='Welcome to the $tock €xchange'>
        <LoginForm />
      </FormContainer>
    );
  }
}

// Map dispatch to props
export default connect(
  null,
  { toLogin }
)(LoginPage);