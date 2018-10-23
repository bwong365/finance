import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import capitalize from '../../../helpers/capitalize';
import { flex, banner, bannerContainer, heading } from './Buy.module.scss';
import bannerImg from './banner3.jpg'
import Portfolio from '../../stock/Portfolio';
import BuyForm from './BuyForm'


const Buy = props => (
  <div>
    <div className={bannerContainer}>
      <img className={banner} src={bannerImg} alt=''></img>
    </div>
    <h1 className={heading}>Buy stocks!</h1>
    <div className={flex}>
      <BuyForm />
    </div>
  </div>
)

export default Buy;