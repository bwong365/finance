import React from 'react'

import { button } from './Button.module.scss'

const Button = ({ onClick, label }) => (
  <button className={button} onClick={onClick}>{label}</button>
)

export default Button;