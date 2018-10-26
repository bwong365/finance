import React from 'react';

import { bar } from './NavBar.module.scss';

// Contains Nav
const NavBar = props => (
  <nav className={bar}>
      {props.children}
  </nav>
);

export default NavBar;