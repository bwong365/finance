import React from 'react'

import {
  container,
  background,
  formContainer,
  heading,
  childContainer
} from './FormContainer.module.scss'

const Login = props => (
  <div className={container}>
    <div className={background}></div>
    <div className={formContainer}>
      <h1 className={heading}>{props.heading}</h1>
      <div className={childContainer}>
        {props.children}
      </div>
    </div>
  </div>
)

export default Login;