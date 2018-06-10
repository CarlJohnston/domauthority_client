import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import 'promise-polyfill';
import createHistory from "history/createBrowserHistory";

import 'foundation-sites/dist/css/foundation.min.css'
import 'pnotify/dist/PNotifyBrightTheme.css'

import './App.css';

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
        setCurrentUser: function (data) {
          this.setState((prevState) => {
            return {
              currentUser: {
                currentUser: data,
                setCurrentUser: prevState.currentUser.setCurrentUser,
                clearCurrentUser: prevState.currentUser.clearCurrentUser,
              },
            };
          }, function () {
            authenticationToken.set(data);
          });
        }.bind(this),
        clearCurrentUser: function () {
          this.setState((prevState) => {
            return {
              currentUser: {
                currentUser: {
                  uid: null,
                  name: null,
                  username: null,
                  accessToken: null,
                  client: null,
                },
                setCurrentUser: prevState.currentUser.setCurrentUser,
                clearCurrentUser: prevState.currentUser.clearCurrentUser,
              },
            };
          }, function () {
            authenticationToken.clear();
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
