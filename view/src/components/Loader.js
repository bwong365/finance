import React from 'react';

import { loader, loader1 } from './Loader.module.scss';

// Loading animation by Siddarth Pamar https://codepen.io/Siddharth11/
const Loader = () => (
  <div className={`${loader} ${loader1}`}>
    <div>
      <div>
        <div>
          <div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Loader;