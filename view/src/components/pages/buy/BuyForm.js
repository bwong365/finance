import React, { Component } from 'react';
import axios                from 'axios';

import Button from '../../form/Button';
import Loader from '../../Loader';

import { form, text, button, number } from './BuyForm.module.scss';

/**
 * Form to purchase stock
 */
export default class BuyForm extends Component {
  state = {
    loading: false,
    message: '',
    shares: '',
    symbol: '',
  };

  handleChange = e => {
    const field = e.target.name;
    this.setState({
      [field]: e.target.value
    });
  };

  submitForm = async e => {
    e.preventDefault();
    
    // Disallow empty values
    if (this.state.symbol === '' || this.state.shares === '') return;
    
    // Start animation
    this.setState({
      loading: true
    });

    // Send server request
    const { shares, symbol } = this.state;
    const token = localStorage.getItem('token');
    try {
      await axios
        .post('/buy',
          { shares, symbol },
          { headers: { authorization: `Bearer ${token}` } }
        );
      
      // Clear fields and indicate success
      this.setState({
        loading: false,
        message: 'Success!',
        shares: '',
        symbol: '',
      });
    } catch (e) {
      console.log(e);
      this.setState({
        message: 'Something went wrong...',
        loading: false
      });
    }
  }

  render() {
    const { message, shares, symbol } = this.state;
    
    return (
      <form className={form}>
        <input className={text} type='text' name='symbol' value={symbol} onChange={this.handleChange} placeholder='Stock Symbol' />
        <input className={number} type='number' name='shares' value={shares} onChange={this.handleChange} min='1' placeholder='Shares' />

        {this.state.loading ? <Loader /> : (
          <div>
            <Button className={button} onClick={this.submitForm} label='Buy!' />
            <p>{message}</p>
          </div>)}
      </form>
    );
  }
}
