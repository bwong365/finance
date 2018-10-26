import React from 'react';

import FormContainer    from '../../form/FormContainer';
import RegistrationForm from './RegistrationForm';

// Contains registration form
const RegistrationPage = props => (
  <FormContainer heading='Register Here'>
    <RegistrationForm />
  </FormContainer>
);

export default RegistrationPage;