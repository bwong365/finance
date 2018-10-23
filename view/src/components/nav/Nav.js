import React from 'react';
import NavBar from './NavBar';
import { connect } from 'react-redux';
import { list, left, right, link, normal, small } from './Nav.module.scss';
import { Link } from 'react-router-dom'


const Nav = props => {
  const varSize = (props.expanded)
    ? normal
    : small

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
  )
}

export default connect(
  state => ({ username: state.auth.username, expanded: state.expanded })
)(Nav);