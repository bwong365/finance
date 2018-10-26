import React from 'react';

import {
  background,
  childContainer,
  container,
  formContainer,
  heading,
} from './FormContainer.module.scss';

// Wraps a form, used in login and registration pages
const FormContainer = props => (
  <div className={container}>
    <div className={background}></div>
    <div className={formContainer}>
      <h1 className={heading}>{props.heading}</h1>
      <div className={childContainer}>
        {props.children}
      </div>
    </div>
  </div>
);

export default FormContainer;