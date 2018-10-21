import React, { Component } from 'react'
import { connect } from 'react-redux'
import changeInput from '../actions/changeInput';
import displayMessage from '../actions/displayMessage';

class FormContainer extends Component {

  handleChange = e => {
    this.props.changeInput(e.target.value);
  }

  handleClick = e => {
    e.preventDefault();
    this.props.displayMessage();
    console.log(this.props.input);
    console.log(this.props.message);
  }

  render() {
    return (
      <div>
        <input type='text' value={this.props.input} onChange={this.handleChange}/>
        <button onClick={this.handleClick}>submit</button>
        <textarea value={this.props.message} />
      </div>
    )
  }
}

export default connect(
  (state) => ({
    input: state.formData.input,
    message: state.formData.message
  }),
  (dispatch) => ({
    changeInput: input => dispatch(changeInput(input)),
    displayMessage: () => dispatch(displayMessage())
  })
)(FormContainer);