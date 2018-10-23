import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import { setUsername, toLogin } from '../../../actions/auth.actions'

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirm: '',
      message: ''
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
    axios.post('/register', {
      username: this.state.username,
      password: this.state.password,
      confirm: this.state.confirm
    }).then(res => this.handleResponse(res))
      .catch(err => this.handleError(err));
  }

  handleResponse = res => {
    if (res.request.status === 201) {
      this.props.toLogin(false);
      this.setState({
        username: '',
        password: '',
        message: 'Success!'
      });
      localStorage.setItem('token', res.data.token);
      this.props.setUsername(res.data.username);
      this.props.history.push('/');
      
    } else {
      this.setState({
        message: 'Could not register'
      })
    }
  }

  handleError = err => {
    console.log(err);
    this.setState({
      message: 'Could not register'
    })
  }

  render() {
    return (
      <form>
        <input type='text' name='username' placeholder='username' value={this.state.username} onChange={this.handleChange}/>
        <input type='password' name='password' placeholder='Password' value={this.state.password} onChange={this.handleChange}/>
        <input type='password' name='confirm' placeholder='Confirm Password' value={this.state.confirm} onChange={this.handleChange}/>
        <button onClick={this.submitForm}>Submit</button>
        <p>{this.state.message}</p>
      </form>
    );
  }
}

export default connect(
  null,
  { setUsername, toLogin }
)(withRouter(RegistrationForm));