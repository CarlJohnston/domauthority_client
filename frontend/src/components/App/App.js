import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'promise-polyfill';

import 'foundation-sites/dist/css/foundation.min.css'
import 'pnotify/dist/PNotifyBrightTheme.css'

import './App.css';

import Layout from '../Layout/Layout';

import CurrentUserContext from '../../contexts/CurrentUserContext';

import TOKEN from '../../configs/Token';

import AuthenticationToken from '../../helpers/AuthenticationToken';

import $ from 'jquery';
window.$ = window.jQuery = $;
require('foundation-sites');

class App extends Component {
  constructor(props) {
    super(props);

    var authenticationToken = new AuthenticationToken();

    var token = authenticationToken.get();
    this.state = {
      currentUser: {
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

          authenticationToken.clear();
        },
      },
    };
  }

  render() {
    return (
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <Router>
          <Route to='/' component={Layout} />
        </Router>
      </CurrentUserContext.Provider>
    );
  }
}

export default App;
