import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import 'promise-polyfill';
import createHistory from "history/createBrowserHistory";

import 'foundation-sites/dist/css/foundation.min.css'
import 'pnotify/dist/PNotifyBrightTheme.css'

import './App.css';

import 'foundation-icons/foundation-icons.css';

import Layout from 'components/Layout/Layout';

import CurrentUserContext from 'contexts/CurrentUserContext';

import AuthenticationToken from 'helpers/AuthenticationToken';

import $ from 'jquery';
window.$ = window.jQuery = $;
require('foundation-sites');

class App extends Component {
  constructor(props) {
    super(props);

    this.history = createHistory();

    var token = AuthenticationToken.get();

    this.state = {
      currentUser: {
        currentUser: {
          name: token ? token.name : null,
          username: token ? token.username : null,
        },
        setCurrentUser: function (data) {
          this.setState((prevState) => {
            return {
              currentUser: Object.assign(prevState.currentUser, {
                currentUser: data,
              }),
            };
          }, function () {
            AuthenticationToken.set(data);
          });
        }.bind(this),
        clearCurrentUser: function () {
          this.setState((prevState) => {
            return {
              currentUser: Object.assign(prevState.currentUser, {
                currentUser: {
                  name: null,
                  username: null,
                },
              }),
            };
          }, function () {
            AuthenticationToken.clear();
          });
        }.bind(this),
      },
    };
  }

  render() {
    return (
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <Router history={this.history}>
          <Route to='/' component={Layout} />
        </Router>
      </CurrentUserContext.Provider>
    );
  }
}

export default App;
