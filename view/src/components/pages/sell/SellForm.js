import React, { Component } from 'react';
import { connect } from 'react-redux';
import { form, text, button, number } from './SellForm.module.scss';
import axios from 'axios';
import monetize from '../../../helpers/monetize';
import Loader from '../../Loader';
import Button from '../../form/Button'

export default class BuyForm extends Component {
  state = {
    symbol: '',
    shares: '',
    message: '',
    portfolio: '',
    loading: true,
    currentMax: 1
  }

  componentDidMount() {
    this.getPortfolio();
  }

  getPortfolio = async () => {
    const token = localStorage.getItem('token');
    try {
      const portfolioData = await axios('/amounts', { headers: { authorization: `Bearer ${token}` } })
      console.log(portfolioData);
      const portfolio = {};
      portfolioData.data.forEach(stock => {
        portfolio[stock.symbol] = stock.amount;
      })
      this.setState({
        portfolio,
        loading: false
      })
      console.log(this.state);
    } catch (e) {
      console.log(e);
      this.setState({
        loading: false
      })
    }
  }

  handleChange = e => {
    if (this.state.symbol === '') return;
    const field = e.target.name;
    this.setState({
      [field]: e.target.value,
    }, () => {
      this.setState({
        message: this.state.symbol + ' ' + this.state.shares
      })
    })
  }

  handleSelect = e => {
    this.setState({
      symbol: e.target.value,
      currentMax: this.state.portfolio[e.target.value]
    })
  }

  submitForm = async e => {
    e.preventDefault();
    if (this.state.symbol === '' || this.state.shares === '') return;
    const { symbol, shares } = this.state;
    const token = localStorage.getItem('token');
    try {
      await axios
        .post('/sell',
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
    const { currentMax, portfolio, loading, message } = this.state
    
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
    )
  }
}
