import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { Link, withRouter }     from 'react-router-dom';
import axios                    from 'axios';
import { setUsername, toLogin } from '../../../actions/authActions';

import Button    from '../../form/Button';
import Loader    from '../../Loader';
import Message   from '../../form/Message';
import TextInput from '../../form/TextInput';

class RegistrationForm extends Component {
  state = {
    confirm: '',
    loading: false,
    message: '',
    password: '',
    username: '',
  };

  // Clear tokens on mount
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
    // Start loading animation
    this.setState({
      loading: true
    })

    // Call server to register new user
    axios.post('/register', {
      username: this.state.username,
      password: this.state.password,
      confirm: this.state.confirm
    }).then(res => this.handleResponse(res))
      .catch(err => this.handleError(err));
  }

  handleResponse = res => {
    // If successful, set username and token
    if (res.request.status === 201) {
      this.props.toLogin(false);
      this.setState({
        loading: false,
        message: 'Success!',
        password: '',
        username: '',
      });
      localStorage.setItem('token', res.data.token);
      this.props.setUsername(res.data.username);
      
      // Redirect to home
      this.props.history.push('/');

    } else {
      this.setState({
        loading: false,
        message: 'Could not register',
      });
    }
  }

  handleError = err => {
    console.log(err);
    this.setState({
      loading: false,
      message: 'Could not register',
    });
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

// Map dispatch to props
export default connect(
  null,
  { setUsername, toLogin }
)(withRouter(RegistrationForm));