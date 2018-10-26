import React from 'react';

import { button } from './Button.module.scss';

// It's a button
const Button = ({ onClick, label }) => (
  <button className={button} onClick={onClick}>{label}</button>
);

export default Button;