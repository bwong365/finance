import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setUsername } from '../../../actions/auth.actions'

class Logout extends Component {

  componentDidMount() {
    localStorage.clear();
    this.props.setUsername('');
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
)(Logout)