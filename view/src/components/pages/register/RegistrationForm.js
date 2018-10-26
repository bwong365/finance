import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom'
import { setUsername, toLogin } from '../../../actions/auth.actions'
import TextInput from '../../form/TextInput';
import Message from '../../form/Message';
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
    const { username, password, message, confirm, loading } = this.state;
    return (
      <form>
        <TextInput type='text' name='username' label='username' value={username} onChange={this.handleChange} />
        <TextInput type='password' name='password' label='password' value={password} onChange={this.handleChange} />
        <TextInput type='password' name='confirm' label='confirm password' value={confirm} onChange={this.handleChange} />
        <Button onClick={this.submitForm} label='Register' />
        {loading 
          ? <Loader /> 
          : (<div>
              <Message text={message}/>
              <span>Would you like to <Link to='/login'>Login</Link> instead?</span>
            </div>)}
      </form>
    );
  }
}

export default connect(
  null,
  { setUsername, toLogin }
)(withRouter(RegistrationForm));