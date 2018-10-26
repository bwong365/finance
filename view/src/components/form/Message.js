import React from 'react';

import { message } from './Message.module.scss';

// Error message component
const Message = ({ text }) => (
  <p className={message}>{text}</p>
);

export default Message;