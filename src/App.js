import React, { Component } from 'react';
import logo from './logo.svg';

import './App.css';

import Timer from './timer/Timer.react';
import Entries from './entries/Entries.react';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Time Tracker</h2>
          </div>
        </div>
        <Timer />
        <Entries />
      </div>
    );
  }
}

export default App;
