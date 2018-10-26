import React       from 'react';
import { Link }    from 'react-router-dom'
import { connect } from 'react-redux';

import NavBar from './NavBar';

import {
  left,
  link,
  list,
  normal,
  right, 
  small } from './Nav.module.scss';

const Nav = props => {
  // Change width of links depending on props.expanded
  const varSize = (props.expanded)
    ? normal
    : small;

  return (
    <NavBar>
      <ul className={`${list} ${left}`}>
        <li className={`${link} ${small} ${left}`}>
          <Link to='/'><i className="fas fa-dollar-sign"></i></Link>
        </li>
        <li className={`${link} ${varSize}`}>
          <Link to='/buy'>Buy</Link>
        </li>
        <li className={`${link} ${varSize}`}>
          <Link to='/sell'>Sell</Link>
        </li>
      </ul>
      
      <ul className={`${list} ${right}`}>
        <li className={`${link} ${varSize}`}>
          <Link to='/logout'>Log out</Link>
        </li>
      </ul>
    </NavBar>
  );
}

// Map state to props
export default connect(
  state => ({ username: state.auth.username, expanded: state.expanded })
)(Nav);