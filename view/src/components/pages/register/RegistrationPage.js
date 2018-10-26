import React, { Component } from 'react'
import RegistrationForm from './RegistrationForm'
import FormContainer from '../../form/FormContainer'
import { Link } from 'react-router-dom';


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