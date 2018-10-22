export default {
  changeInput,
  clearForm,
  displayText
}

export function changeInput (text) {
  return {type: 'CHANGE_INPUT', text};
}

export function clearForm() {
  return {type: 'CLEAR_FORM'};
}

export function displayText() {
  return {type: 'DISPLAY_TEXT'};
}