import React from 'react';
import img from './404-min.jpg';
import { container, blocker, image, msg } from './NotFound.module.scss';

const NotFound = () =>  ( 
    <div className={container}>
      <div className={blocker}></div> {/* Make text universally unselectable */}
      <img className={image} src={img} alt='Error 404'></img>
      <span className={msg}>404 Not Found</span>
    </div>
  );

export default NotFound;