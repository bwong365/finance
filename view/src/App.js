import React, { Component } from 'react';

import './App.module.css';
import FormContainer from './form/FormContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Finance</h1>
        <FormContainer />
      </div>
    );
  }
}

export default App;
