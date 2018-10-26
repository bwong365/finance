import { combineReducers } from 'redux';

import auth from './auth';
import expanded from './expanded';

export default combineReducers({
  auth,
  expanded,
});