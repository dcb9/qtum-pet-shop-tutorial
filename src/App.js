import React, { Component } from 'react';
import './App.css';
import Pets from './components/Pets.js'

class App extends Component {
  render() {
    return (
      <div>
        <header className="header">
          <h1>Welcome to Pet Shop Qtum Tutorial</h1>
        </header>
        <Pets></Pets>
      </div>
    );
  }
}

export default App;
