import React from 'react';
import NavBar from './NavBar';
import { connect } from 'react-redux';
import { list, left, right, link } from './Nav.module.scss';
import { Link } from 'react-router-dom'

const Nav = props => (
  <nav>
    <NavBar>
        <ul className={`${list} ${right}`}>
          <li className={link}>
            <Link to='/Logout'>Register</Link>
          </li>
        </ul>
        <ul className={`${list} ${left}`}>
          <li className={link}>
            <Link to='/Buy'>Buy</Link>
          </li>
          <li className={link}>
            <Link to='/Sell'>Sell</Link>
          </li>
        </ul>
    </NavBar>
  </nav>
)

export default connect(
  state => ({username: state.auth.username})
)(Nav);