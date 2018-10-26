import React, { Component } from 'react';
import axios from 'axios';
import Loader from '../Loader';
import monetize from '../../helpers/monetize'
import { form, mini } from './GetQuotes.module.scss'
import Button from '../form/Button'

export default class GetQuote extends Component {
  state = {
    stock: '',
    result: '',
    loading: false
  }

  handleChange = e => {
    this.setState({
      stock: e.target.value
    })
  }

  lookup = async e => {
    e.preventDefault();
    this.setState({ loading: true, result: '' })
    const token = localStorage.getItem('token');
    try {
      const result = await axios('/search?keywords=' + this.state.stock, { headers: { authorization: `Bearer ${token}` } })
      console.log(result);
      const { symbol, name, price } = result.data;
      
      this.setState({
        stock: '',
        result: `${symbol}, $${monetize(price).toFixed(2)}, ${name}`,
        loading: false
      })
    } catch (e) {
      console.log(e);
      this.setState({
        stock: '',
        result: 'Nothing found!',
        loading: false
      })
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