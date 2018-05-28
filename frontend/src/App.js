import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import Layout from './Layout.js';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
  }
}

export default App;
