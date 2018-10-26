import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { withRouter }       from 'react-router-dom';
import { setUsername }      from '../../../actions/authActions';

class Logout extends Component {
  componentDidMount() {
    localStorage.clear();
    this.props.setUsername('');
    this.props.history.push('/login');
  }

  render() {
    return (
      <div>You are now logged out</div>
    );
  }
}

// Map dispatch to props
export default connect(
  null,
  { setUsername }
)(withRouter(Logout));