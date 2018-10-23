import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import capitalize from '../../../helpers/capitalize';
import { flex, banner, bannerContainer, heading } from './Sell.module.scss';
import bannerImg from './banner3.jpg'
import SellForm from './SellForm'


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
)

export default Sell;