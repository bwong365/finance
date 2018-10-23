import React from 'react';
import { block, bar } from './NavBar.module.scss'

const x = false;

const NavBar = props => (
  <nav>
    {x && <div className={block}>here</div> }
    <div className={bar}>
      {props.children}
    </div>
  </nav>
)

export default NavBar;