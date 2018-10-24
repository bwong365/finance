import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom'
import { setUsername } from '../../../actions/auth.actions'
import Button from '../../form/Button'
import TextInput from '../../form/TextInput'
import Message from '../../form/Message'
import Loader from '../../Loader'

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      message: '',
      loading: false
    }
  }

  componentDidMount() {
    localStorage.clear();
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitForm = e => {
    e.preventDefault();
    this.setState({
      loading: true
    })
    axios.post('/login', {
      username: this.state.username,
      password: this.state.password
    }).then(res => this.handleResponse(res))
      .catch(err => this.handleError(err));
  }

  handleResponse = res => {
    if (res.request.status === 200) {
      this.setState({
        username: '',
        password: '',
        loading: false,
        message: 'Success!'
      });
      localStorage.setItem('token', res.data.token);
      this.props.setUsername(res.data.username);

      this.props.history.push('/');

    } else {
      this.setState({
        message: 'Could not be logged in',
        loading: false
      })
    }
  }

  handleError = err => {
    console.log(err);
    this.setState({
      loading: false,
      message: 'Could not be logged in'
    })
  }

  render() {
    return (
      <form>
        <TextInput type='text' name='username' value={this.state.username} onChange={this.handleChange} label='username'/>
        <TextInput type='password' name='password' value={this.state.password} onChange={this.handleChange} label='password'/>
        <Button onClick={this.submitForm} label='Submit' />
        {this.state.loading
          ? <Loader /> 
          : (<div>
               <Message text={this.state.message}/>
               <span>Don't have an account? <Link to='/register'>Register here!</Link></span>
              </div>
        )}

      </form>
    );
  }
}

export default connect(
  null,
  { setUsername }
)(withRouter(LoginForm));