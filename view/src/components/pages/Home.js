import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Home = (props) => {
  return (
    <div>
      <h1>This is the home page!</h1>
    </div>
  )
}

export default connect(
  state => ({toLogin: state.auth.toLogin})
)(Home);