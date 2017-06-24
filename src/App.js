import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ConsoleData from './components/console/ConsoleData.js';
import MapData from './components/map/MapData.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro"></p>

          {/*<ConsoleData /> */}
          <MapData />
      </div>
    );
  }
}

export default App;
