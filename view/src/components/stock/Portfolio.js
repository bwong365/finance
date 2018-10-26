import React, { Component } from 'react';
import axios                from 'axios';
import monetize             from '../../helpers/monetize';

import Loader from '../Loader';

import { table, subHeading } from './Portfolio.module.scss';

// Gets portfolio information from server
export default class Portfolio extends Component {
  state = {
    balance: '',
    loading: true,
    shareTable: null,
    total: '',
  };

  // Get portfolio upon load
  async componentDidMount() {
    const done = await this.getPortfolio();
    console.log(done);
  }

  getPortfolio = async () => {
    const token = localStorage.getItem('token');
    try {
      const data = await axios('/portfolio', { headers: { authorization: `Bearer ${token}` } })
      const shareInfo = data.data.shares;
      
      // Format results to table
      const shareTable = shareInfo.map(row => (
        <tr key={row.symbol}>
          <td>{row.symbol.toUpperCase()}</td>
          <td>{monetize(row.price).toFixed(2)}</td>
          <td>{row.amount}</td>
        </tr>
      ));
      
      // Get total share worth
      const total = shareInfo.reduce((acc, row) => (acc + (row.price * row.amount)), 0);
      const balance = data.data.balance;

      // Display portfolio information
      this.setState({
        balance,
        shareTable,
        loading: false,
        total: monetize(total).toFixed(2),
      });
    } catch (e) {
      console.log(e);
      this.setState({
        loading: false
      })
    }
  }

  render() {
    const { shareTable, total, balance, loading } = this.state;
    
    // If data exists, display info otherwise nothing message
    const loaded = shareTable ? (
      <div>
        <h3 className={subHeading}>Total Share Worth: ${total}</h3>
        <h3 className={subHeading}>Cash On Hand: ${balance}</h3>
        <table className={table}>
          <thead>
            <tr><th>Stock</th><th>Price</th><th>Amount</th></tr>
          </thead>
          <tbody>
            {shareTable}
          </tbody>
        </table>
      </div>
    ) : (
      <div>
        <p>here's nothing here!</p>
      </div>
    );
    
    // Displys either loading animation or portfolio
    return (
      <div>
        {loading ? (
          <Loader />
        ) : (
          <div>
            <h2>Your stock portfolio:</h2>
            {loaded}
          </div>
        )}
      </div>
    );
  }
}