import React, { Component } from 'react';
import { connect } from 'react-redux';
import { form, text, button, number } from './BuyForm.module.scss';
import axios from 'axios';
import Button from '../../form/Button'
import TextInput from '../../form/TextInput'
import Message from '../../form/Message'
import Loader from '../../Loader'

export default class BuyForm extends Component {
  state = {
    symbol: '',
    shares: '',
    message: '',
    loading: false
  }

  handleChange = e => {
    const field = e.target.name;
    this.setState({
      [field]: e.target.value
    })
  }

  submitForm = async e => {
    e.preventDefault();
    this.setState({
      loading: true
    })
    const { symbol, shares } = this.state;
    const token = localStorage.getItem('token');
    try {
      await axios
        .post('/buy',
          { symbol, shares },
          { headers: { authorization: `Bearer ${token}` } }
        );

      this.setState({
        message: 'Success!',
        symbol: '',
        shares: '',
        loading: false
      })
    } catch (e) {
      console.log(e);
      this.setState({
        message: 'Something went wrong...',
        loading: false
      })
    }
  }

  render() {
    const { symbol, shares, message } = this.state;
    return (
      <form className={form}>
        <input className={text} type='text' name='symbol' value={symbol} onChange={this.handleChange} placeholder='Stock Symbol' />
        <input className={number} type='number' name='shares' value={shares} onChange={this.handleChange} min='1' placeholder='Shares' />

        {this.state.loading ? <Loader /> : (
          <div>
            <Button className={button} onClick={this.submitForm} label='Buy!' />
            <Message text={message}/>
          </div>)}
      </form>
    )
  }
}
