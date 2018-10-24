import React from 'react'
import { message } from './Message.module.scss'

const Message = props => <p className={message}>{props.text}</p>

export default Message;