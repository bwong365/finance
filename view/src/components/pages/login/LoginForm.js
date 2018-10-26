import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect }          from 'react-redux';
import axios                from 'axios';
import { setUsername }      from '../../../actions/authActions';

import Button    from '../../form/Button';
import Loader    from '../../Loader';
import Message   from '../../form/Message';
import TextInput from '../../form/TextInput';

// Form for login
class LoginForm extends Component {
  state = {
    loading: false,
    message: '',
    password: '',
    username: '',
  };

  // Clear local storage upon reaching login page
  componentDidMount() {
    localStorage.clear();
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submitForm = e => {
    e.preventDefault();
    // Start animation
    this.setState({
      loading: true
    });
    
    // Call server for user verification
    axios.post('/login', {
      username: this.state.username,
      password: this.state.password
    }).then(res => this.handleResponse(res))
      .catch(err => this.handleError(err));
  }

  handleResponse = res => {
    // Upon success, indicate success and set token and username
    if (res.request.status === 200) {
      this.setState({
        loading: false,
        message: 'Success!',
        username: '',
        password: '',
      });
      localStorage.setItem('token', res.data.token);
      this.props.setUsername(res.data.username);

      // Redirect to home page
      this.props.history.push('/');

    } else {
      this.setState({
        message: 'Could not be logged in',
        loading: false
      });
    }
  }

  handleError = err => {
    console.log(err);
    this.setState({
      loading: false,
      message: 'Could not be logged in'
    });
  }

  render() {
    return (
      <form>
        <TextInput type='text' name='username' value={this.state.username} onChange={this.handleChange} label='username'/>
        <TextInput type='password' name='password' value={this.state.password} onChange={this.handleChange} label='password'/>
        <Button onClick={this.submitForm} label='Submit' />
        {
          (this.state.loading)
            ? <Loader /> 
            : (
                <div>
                  <Message text={this.state.message}/>
                  <span>Don't have an account? <Link to='/register'>Register here!</Link></span>
                </div>
              )
        }

      </form>
    );
  }
}

// Map dispatch to props, and allow for redirect through router history
export default connect(
  null,
  { setUsername }
)(withRouter(LoginForm));