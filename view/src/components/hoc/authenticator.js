import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import axios from 'axios'

// Actions
import { toLogin, setUsername, isAuthenticating } from '../../actions/auth.actions';

const authenticator = Comp => (
  class AuthComponent extends Component {
    componentDidMount() {

      // Check for authentication
      this.props.isAuthenticating(true);
      const token = localStorage.getItem('token');
      if (token) {
        this.verifyUser(token);
      } else {
        this.props.isAuthenticating(false);
        this.props.toLogin(true);
      }
    }

    verifyUser = (token) => {
      axios.post('/auth', {}, { headers: { authorization: `Bearer ${token}` } })
        .then(res => {
          this.props.isAuthenticating(false);
          if (res.request.status === 200) {
            console.log(res.data.username);
            this.props.setUsername(res.data.username);
          } else {
            this.props.toLogin(true);
          }
        })
        .catch(e => {
          console.log(e)
          this.props.isAuthenticating(false);
          this.props.toLogin(true);
        });
    }

    render() {
      return <Comp {...this.props} />
    }
  }
)

export default compose(connect(
  null,
  { setUsername, toLogin, isAuthenticating }
), authenticator)