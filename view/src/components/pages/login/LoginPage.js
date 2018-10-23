import React, { Component } from 'react'
import LoginForm from './LoginForm'
import FormContainer from '../../form/FormContainer'
import { toLogin } from '../../../actions/auth.actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class LoginPage extends Component {
  componentDidMount() {
    this.props.toLogin(false);
  }

  componentDidUpdate() {
    this.props.toLogin(false);
  }

  render() {
    return (
      <div>
        <FormContainer heading='Welcome to the $tock €xchange'>
          <LoginForm />
          <Link to='/register'>Register instead!</Link>
        </FormContainer>
        
      </div>
    )
  }
}

export default connect(
  null,
  { toLogin }
)(LoginPage);