import React, { Component } from 'react'
import axios                from 'axios'
import { compose }          from 'redux'
import { connect }          from 'react-redux'

// Actions
import { toLogin, setUsername, isAuthenticating } from '../../actions/authActions';

/**
 * Make a component enforce global authentication
 */
const makeAuthenticator = Comp => (
  class AuthComponent extends Component {
    componentDidMount() {
      const { isAuthenticating, toLogin } = this.props;
      
      // Loading animation
      isAuthenticating(true);

      // Get token from local storage
      const token = localStorage.getItem('token');

      // Token exists, verify token with server
      if (token) {
        this.verifyUser(token);

      // Token does not exist
      } else {
        isAuthenticating(false);
        toLogin(true);
      }
    }

    // Call server for token verification and get username
    verifyUser = token => {
      const { isAuthenticating, setUsername, toLogin } = this.props;

      axios.post('/auth', {}, { headers: { authorization: `Bearer ${token}` } })
        .then(res => {
          isAuthenticating(false);
          if (res.request.status === 200) {
            setUsername(res.data.username);
          } else {
            toLogin(true);
          }
        })
        .catch(e => {
          console.log(e)
          isAuthenticating(false);
          toLogin(true);
        });
    }

    // Return HOC
    render() {
      return <Comp {...this.props} />;
    }
  }
)

// map dispatch to props
export default compose(connect(
  null,
  { setUsername, toLogin, isAuthenticating }
), makeAuthenticator);