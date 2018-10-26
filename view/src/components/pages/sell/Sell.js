import React from 'react';

import SellForm from './SellForm';

import bannerImg from './banner1.jpg';
import { flex, banner, bannerContainer, heading } from './Sell.module.scss';

const Sell = props => (
  <div>
    <div className={bannerContainer}>
      <img className={banner} src={bannerImg} alt=''></img>
    </div>
    <h1 className={heading}>Sell Shares!</h1>
    <div className={flex}>
      <SellForm />
    </div>
  </div>
);

export default Sell;