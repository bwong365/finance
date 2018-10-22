import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import capitalize from '../../helpers/capitalize';
import { heading } from './Home.module.scss';

const Home = (props) => {
  const username = capitalize(props.username);
  return (
    <div>
      <h1 className={heading}>Welcome home, {username}!</h1>
    </div>
  )
}

export default connect(
  state => ({
    toLogin: state.auth.toLogin,
    username: state.auth.username
  })
)(Home);