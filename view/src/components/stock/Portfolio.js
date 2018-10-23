import React, { Component } from 'react';
import axios from 'axios';
import monetize from '../../helpers/monetize';
import { table } from './Portfolio.module.scss';
import Loader from '../Loader';

export default class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: null,
      total: '',
      loading: true
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

      const jsx = data.data.map(row => (
        <tr key={row.symbol}>
          <td>{row.symbol.toUpperCase()}</td>
          <td>{monetize(row.price).toFixed(2)}</td>
          <td>{row.amount}</td>
        </tr>
      ));

      const total = data.data.reduce((acc, row) => (acc + (row.price * row.amount)), 0);

      this.setState({
        info: jsx,
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
    const loaded = this.state.info ? (
      <div>
        <h3>Total: {this.state.total}</h3>
        <table className={table}>
          <thead>
            <tr><th>Stock</th><th>Price</th><th>Amount</th></tr>
          </thead>
          <tbody>
            {this.state.info}
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
        {this.state.loading ? (
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