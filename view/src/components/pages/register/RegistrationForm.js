import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import { setUsername, toLogin } from '../../../actions/auth.actions'
import TextInput from '../../form/TextInput';
import Button from '../../form/Button'
import Loader from '../../Loader'

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirm: '',
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
        message: 'Success!',
        loading: false
      });
      localStorage.setItem('token', res.data.token);
      this.props.setUsername(res.data.username);
      this.props.history.push('/');

    } else {
      this.setState({
        message: 'Could not register',
        loading: false
      })
    }
  }

  handleError = err => {
    console.log(err);
    this.setState({
      message: 'Could not register',
      loading: false
    })
  }

  render() {
    return (
      <form>
        <TextInput type='text' name='username' placeholder='username' value={this.state.username} onChange={this.handleChange} />
        <TextInput type='password' name='password' placeholder='Password' value={this.state.password} onChange={this.handleChange} />
        <TextInput type='password' name='confirm' placeholder='Confirm Password' value={this.state.confirm} onChange={this.handleChange} />
        <Button onClick={this.submitForm} label='Register' />
        {this.state.loading ? <Loader /> : <p>{this.state.message}</p>}
      </form>
    );
  }
}

export default connect(
  null,
  { setUsername, toLogin }
)(withRouter(RegistrationForm));