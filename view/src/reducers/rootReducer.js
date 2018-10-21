//import { combineReducers } from 'redux';
//import formReducer from './formReducer';

const initialState = {
  expanded: false
}

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'INPUT_CHANGED': return ({
      ...state,
      formData: {
        ...state.formData,
        input: action.text
      }
    })
    case 'DISPLAYTEXT': return ({
      ...state,
      formData: {
        ...state.formData,
        message: state.formData.input,
        input: ''
      }
    })
    default: return state;
  }
}

export default rootReducer;