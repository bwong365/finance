const formReducer = (state, action) => {
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

export default formReducer;