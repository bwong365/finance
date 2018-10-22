import React, { Component } from 'react'
import RegistrationForm from './RegistrationForm'
import FormContainer from '../../form/FormContainer'


class RegistrationPage extends Component {
  componentDidMount() {
    localStorage.clear();
  }

  render() {
    return (
      <FormContainer heading='Register Here'>
        <RegistrationForm />
      </FormContainer>
    )
  }
}

export default RegistrationPage