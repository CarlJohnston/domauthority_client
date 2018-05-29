import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'promise-polyfill';

import 'foundation-sites/dist/css/foundation.min.css'

import './App.css';

import Layout from '../Layout/Layout';

import $ from 'jquery';
window.$ = window.jQuery = $;
require('foundation-sites');

class App extends Component {
  render() {
    return (
      <Router>
        <Route to='/' component={Layout} />
      </Router>
    );
  }
}

export default App;
