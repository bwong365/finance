import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import { setUsername } from '../../../actions/auth.actions'

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
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
        message: 'Success!'
      });
      localStorage.setItem('token', res.data.token);
      this.props.setUsername(res.data.username);
      
      this.props.history.push('/');

    } else {
      this.setState({
        message: 'Could not be logged in'
      })
    }
  }

  handleError = err => {
    console.log(err);
    this.setState({
      message: 'Could not be logged in'
    })
  }

  render() {
    return (
      <form>
        <input type='text' name='username' value={this.state.username} onChange={this.handleChange}/>
        <input type='password' name='password' value={this.state.password} onChange={this.handleChange}/>
        <button onClick={this.submitForm}>Submit</button>
        <p>{this.state.message}</p>
      </form>
    );
  }
}

export default connect(
  null,
  { setUsername }
)(withRouter(LoginForm));