import React from 'react';
import { block, bar } from './NavBar.module.scss'

const x = false;

const NavBar = props => (
  <div>
    {x && <div className={block}>here</div> }
    <div className={bar}>
      {props.children}
    </div>
  </div>
)

export default NavBar;