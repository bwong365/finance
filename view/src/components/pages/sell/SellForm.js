import React, { Component } from 'react';
import axios                from 'axios';

import Button from '../../form/Button';
import Loader from '../../Loader';

import { form, button, number } from './SellForm.module.scss';

export default class BuyForm extends Component {
  state = {
    currentMax: 1,
    loading: true,
    message: '',
    portfolio: '',
    shares: '',
    symbol: '',
  };

  componentDidMount() {
    this.getPortfolio();
  }

  getPortfolio = async () => {
    // Get token from storage
    const token = localStorage.getItem('token');

    try {
      // Call server for portfolio information
      const portfolioData = await axios('/amounts', { headers: { authorization: `Bearer ${token}` } })
      
      // Format portfolio info
      const portfolio = {};
      portfolioData.data.forEach(stock => {
        portfolio[stock.symbol] = stock.amount;
      });

      // Display portfolio
      this.setState({
        portfolio,
        loading: false,
      });

    } catch (e) {
      this.setState({
        loading: false
      });
    }
  }

  handleChange = e => {
    if (this.state.symbol === '') return;
    const field = e.target.name;
    this.setState({ [field]: e.target.value });
  }

  handleSelect = e => {
    this.setState({
      currentMax: this.state.portfolio[e.target.value],
      symbol: e.target.value,
    });
  }

  submitForm = async e => {
    e.preventDefault();
    if (this.state.symbol === '' || this.state.shares === '') return;
    
    this.setState({
      loading: true
    });
    
    const { symbol, shares } = this.state;
    const token = localStorage.getItem('token');
    
    try {
      await axios.post('/sell',
          { symbol, shares },
          { headers: { authorization: `Bearer ${token}` } }
        );
      await this.getPortfolio();
      
      this.setState({
        loading: false,
        message: 'Success!',
        shares: '',
        symbol: '',
      });

    } catch (e) {
      this.setState({
        loading: false,
        message: 'Something went wrong...',
      });
    }
  }

  render() {
    const { currentMax, portfolio, loading, message } = this.state;
    
    const options = (Object.keys(portfolio).map(symbol => (
      <option key={symbol} value={symbol}>{symbol.toUpperCase()} (shares owned: {portfolio[symbol]})</option>
    )));

    const { symbol, shares } = this.state;
    return (
      <form className={form}>
        <select name='symbol' value={symbol} onChange={this.handleSelect}>
          <option disabled value=''>Choose a stock</option>
          {options}
        </select>
        <input className={number} type='number' name='shares' value={shares} onChange={this.handleChange} min='1' max={currentMax} placeholder='Shares' />
        {(loading) ? <Loader /> : (
          <div>
            <Button className={button} onClick={this.submitForm} label='Sell!'/>
            <p>{message}</p>
          </div>)}
      </form>
    );
  }
}