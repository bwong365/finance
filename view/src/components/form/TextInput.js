import React from 'react'

import { input } from './TextInput.module.scss'

const TextInput = ({ name, value, type, onChange, label }) => (
  <input className={input} name={name} value={value} type={type} onChange={onChange} placeholder={label} />
)

export default TextInput;