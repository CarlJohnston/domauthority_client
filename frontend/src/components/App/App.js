// @flow
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


type CurrentUser = {
  name?: string,
  username?: string,
};

type State = {
  currentUser: {
    currentUser: CurrentUser,
    setCurrentUser: ((CurrentUser)) => void,
    clearCurrentUser: () => void,
  },
};

type Props = {
};

class App extends Component<Props, State> {
  history: History;

  constructor(props: Props) {
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
          name: token ? token.name : undefined,
          username: token ? token.username : undefined,
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
                  name: undefined,
                  username: undefined,
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
      // $FlowFixMe: React Flow typings are not yet updated to React 16.3
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
