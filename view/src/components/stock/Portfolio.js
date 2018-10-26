import React, { Component } from 'react';
import axios from 'axios';
import monetize from '../../helpers/monetize';
import { table, subHeading } from './Portfolio.module.scss';
import Loader from '../Loader';

export default class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shareTable: null,
      total: '',
      loading: true,
      balance: ''
    }
  }

  async componentDidMount() {
    const done = await this.getPortfolio();
    console.log(done);
  }

  getPortfolio = async () => {
    const token = localStorage.getItem('token');
    try {
      const data = await axios('/portfolio', { headers: { authorization: `Bearer ${token}` } })

      const shareTable = data.data.shares.map(row => (
        <tr key={row.symbol}>
          <td>{row.symbol.toUpperCase()}</td>
          <td>{monetize(row.price).toFixed(2)}</td>
          <td>{row.amount}</td>
        </tr>
      ));

      const total = data.data.shares.reduce((acc, row) => (acc + (row.price * row.amount)), 0);
      const balance = data.data.balance;

      this.setState({
        balance,
        shareTable,
        total: monetize(total).toFixed(2),
        loading: false
      })
    } catch (e) {
      console.log(e);
      this.setState({
        loading: false
      })
    }
  }

  render() {
    const { shareTable, total, balance, loading } = this.state;
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
    )

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
    )
  }
}