import React, { Component } from 'react';
import { connect } from 'react-redux';
import { form, text, button, number } from './BuyForm.module.scss';
import axios from 'axios';
import Button from '../../form/Button'
import TextInput from '../../form/TextInput'

export default class BuyForm extends Component {
  state = {
    symbol: '',
    shares: '',
    message: ''
  }

  handleChange = e => {
    const field = e.target.name;
    this.setState({
      [field]: e.target.value
    })
  }

  submitForm = async e => {
    e.preventDefault();
    const { symbol, shares } = this.state;
    const token = localStorage.getItem('token');
    try {
      await axios
        .post('/buy',
          { symbol, shares },
          { headers: { authorization: `Bearer ${token}` } }
        );

      this.setState({
        message: 'Success!'
      })
    } catch (e) {
      console.log(e);
      this.setState({
        message: 'Something went wrong...'
      })
    }
  }

  render() {
    const { symbol, shares } = this.state;
    return (
      <form className={form}>
        <TextInput className={text} type='text' name='symbol' value={symbol} onChange={this.handleChange} placeholder='Stock Symbol' />
        <TextInput className={number} type='number' name='shares' value={shares} onChange={this.handleChange} min='1' placeholder='Shares' />
        <Button className={button} onClick={this.submitForm} label='Buy!' />
        <p>{this.state.message}</p>
      </form>
    )
  }
}
