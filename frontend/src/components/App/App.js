import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import 'promise-polyfill';
import createHistory from "history/createBrowserHistory";

import 'foundation-sites/dist/css/foundation.min.css'
import 'pnotify/dist/PNotifyBrightTheme.css'

import './App.css';

import 'foundation-icons/foundation-icons.css';

import Layout from 'components/Layout/Layout';
import FetchInterceptor from 'components/FetchInterceptor/FetchInterceptor';

import CurrentUserContext from 'contexts/CurrentUserContext';

import Token from 'helpers/Token';

import $ from 'jquery';
window.$ = window.jQuery = $;
require('foundation-sites');

class App extends Component {
  constructor(props) {
    super(props);

    this.history = createHistory();

    let token;
    try {
      token = Token.get();
    } catch (e) {
      token = null;

      Token.clear();
    }

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
          });
        }.bind(this),
        clearCurrentUser: function () {
          this.setState((prevState) => {
            return {
              currentUser: Object.assign(prevState.currentUser, {
                currentUser: {
                  name: null,
                  username: null,
                }
              }),
            };
          });
        }.bind(this),
      },
    };
  }

  render() {
    return (
      <React.StrictMode>
        <CurrentUserContext.Provider value={this.state.currentUser}>
          <Router history={this.history}>
            <FetchInterceptor>
              <Route to='/' component={Layout} />
            </FetchInterceptor>
          </Router>
        </CurrentUserContext.Provider>
      </React.StrictMode>
    );
  }
}

export default App;
