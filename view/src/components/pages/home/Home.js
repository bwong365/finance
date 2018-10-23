import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import capitalize from '../../../helpers/capitalize';
import { portfolioContainer, banner, bannerContainer, heading } from './Home.module.scss';
import bannerImg from './banner2.jpg'
import Portfolio from '../../stock/Portfolio';


const Home = (props) => {
  const username = capitalize(props.username);
  return (
    <div>
      <div className={bannerContainer}>
        <img className={banner} src={bannerImg} alt=''></img>
      </div>
      <h1 className={heading}>Welcome home, {username}!</h1>
      <div className={portfolioContainer}>
        <Portfolio />
      </div>
    </div>
  )
}

export default connect(
  state => ({
    toLogin: state.auth.toLogin,
    username: state.auth.username
  })
)(Home);