import React from 'react';

import { input } from './TextInput.module.scss';

// Form text input component
const TextInput = ({
  label,
  name,
  onChange,
  type,
  value,
}) => (
  <input 
    className={input}
    name={name}
    onChange={onChange}
    placeholder={label}
    type={type}
    value={value} />
);

export default TextInput;