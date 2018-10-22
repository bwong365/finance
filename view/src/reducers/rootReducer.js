import { combineReducers } from 'redux';
import formData from './formData';
import expanded from './expanded';
import auth from './auth'

export default combineReducers({
  auth,
  formData,
  expanded
});