import React, { Component } from 'react'
import LoginForm from './LoginForm'
import FormContainer from '../../form/FormContainer'
import { toLogin } from '../../../actions/auth.actions'
import { connect } from 'react-redux'

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
    )
  }
}

export default connect(
  null,
  { toLogin }
)(LoginPage);