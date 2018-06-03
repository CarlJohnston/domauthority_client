import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'promise-polyfill';

import 'foundation-sites/dist/css/foundation.min.css'
import 'pnotify/dist/PNotifyBrightTheme.css'

import './App.css';

import Layout from '../Layout/Layout';

import CurrentUser from '../../contexts/User';

import TOKEN from '../../configs/Token';

import $ from 'jquery';
window.$ = window.jQuery = $;
require('foundation-sites');

class App extends Component {
  constructor(props) {
    super(props);

    var tokenLocalStorage = localStorage.getItem(TOKEN.authentication.key);
    var token;
    if (tokenLocalStorage) {
      token = JSON.parse(tokenLocalStorage);
    }

    this.state = {
      currentUser: {
        uid: token ? token.uid : null,
        name: token ? token.name : null,
        username: token ? token.username : null,
        accessToken: token ? token.accessToken : null,
        client: token ? token.client : null,
      },
      setCurrentUser: (data) => {
        this.setState({currentUser: data});
      },
      clearCurrentUser: () => {
        this.setState({currentUser: {
          uid: null,
          name: null,
          username: null,
          accessToken: null,
          client: null,
        }});

        localStorage.removeItem(TOKEN.authentication.key);
      },
    };
  }

  render() {
    return (
      <CurrentUser.Provider value={this.state}>
        <Router>
          <Route to='/' component={Layout} />
        </Router>
      </CurrentUser.Provider>
    );
  }
}

export default App;
