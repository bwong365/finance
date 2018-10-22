const initialState = {
  message: '',
  input: ''
}

const formData = (state = initialState, action) => {
  switch(action.type) {
    case 'CHANGE_INPUT': return ({
      ...state,
      input: action.text
    })

    case 'DISPLAY_TEXT': return ({
      ...state,
      message: state.input,
      input: ''
    })

    default: return state;
  }
}

export default formData;

