import React       from 'react';
import { connect } from 'react-redux';
import capitalize  from '../../../helpers/capitalize';

import Portfolio from '../../stock/Portfolio';

import bannerImg from './banner2.jpg';
import { portfolioContainer, banner, bannerContainer, heading } from './Home.module.scss';

// Home page, contains Portfolio information
const Home = props => {
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
  );
}

// map state to props
export default connect(
  state => ({ username: state.auth.username })
)(Home);