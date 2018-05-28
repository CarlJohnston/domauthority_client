import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import jQuery from 'jquery';
import 'foundation-sites/dist/css/foundation.min.css'

import './App.css';

import Layout from '../Layout/Layout';

window.$ = window.jQuery = require('jquery')
const Foundation = require('foundation-sites');

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
