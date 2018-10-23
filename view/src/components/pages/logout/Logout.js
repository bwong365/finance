import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setUsername } from '../../../actions/auth.actions'
import { withRouter } from 'react-router-dom';

class Logout extends Component {

  componentDidMount() {
    localStorage.clear();
    this.props.setUsername('');
    this.props.history.push('/login');
  }

  render() {
    return (
      <div>You are now logged out</div>
    )
  }
}

export default connect(
  null,
  { setUsername }
)(withRouter(Logout));