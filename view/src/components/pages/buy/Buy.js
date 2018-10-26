import React from 'react';

import BuyForm   from './BuyForm';
import GetQuotes from '../../stock/GetQuotes';

import bannerImg from './banner3.jpg';
import { flex, banner, bannerContainer, heading } from './Buy.module.scss';

// Component contains the buy form
const Buy = props => (
  <div>
    <div className={bannerContainer}>
      <img className={banner} src={bannerImg} alt=''></img>
    </div>
    <h1 className={heading}>Buy stocks!</h1>
    <div className={flex}>
      <GetQuotes />
      <BuyForm />
    </div>
  </div>
);

export default Buy;