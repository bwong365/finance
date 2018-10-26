import React, { Component } from 'react';
import axios                from 'axios';
import monetize             from '../../helpers/monetize'

import Button from '../form/Button'
import Loader from '../Loader';

import { form, mini } from './GetQuotes.module.scss'

// Gets a quote, currently contained in buy form
export default class GetQuote extends Component {
  state = {
    loading: false,
    result: '',
    stock: '',
  };

  handleChange = e => {
    this.setState({
      stock: e.target.value
    });
  }

  lookup = async e => {
    e.preventDefault();
    this.setState({ loading: true, result: '' });

    // Call server for info on stock
    const token = localStorage.getItem('token');
    try {
      const result = await axios('/search?keywords=' + this.state.stock, { headers: { authorization: `Bearer ${token}` } })
      const { symbol, name, price } = result.data;
      
      // Display results
      this.setState({
        loading: false,
        result: `${symbol}, $${monetize(price).toFixed(2)}, ${name}`,
        stock: '',
      });

    } catch (e) {
      console.log(e);
      this.setState({
        loading: false,
        result: 'Nothing found!',
        stock: '',
      });
    }  
  }

  render() {
    return (
      <div>
        <form className={form} onSubmit={this.lookup}>
          <input type='text' value={this.state.stock} placeholder='Stock Lookup' onChange={this.handleChange}/>
          { !this.state.loading && <Button onClick={this.lookup} label='Lookup'/>}
          { this.state.loading && <div className={mini}><Loader /></div> }
          <p>{this.state.result}</p>
        </form>
      </div>
    );
  }
}