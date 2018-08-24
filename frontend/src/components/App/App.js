// @flow
import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import 'promise-polyfill';
import createHistory from 'history/createBrowserHistory';
import PNotify from 'pnotify/dist/umd/PNotify';
import $ from 'jquery';
import Modal from 'react-modal';

import 'foundation-sites/dist/css/foundation.min.css';
import 'pnotify/dist/PNotifyBrightTheme.css';

import './App.css';

import 'foundation-icons/foundation-icons.css';

import Layout from 'components/Layout/Layout';
import FetchInterceptor from 'components/FetchInterceptor/FetchInterceptor';

import CurrentUserContext from 'contexts/CurrentUserContext';

import Token from 'helpers/Token';

import type { CurrentUserContext as CurrentUserContextType, CurrentUser } from 'contexts/CurrentUserContext.types';
import type { RouterHistory } from 'react-router-dom';

window.$ = window.jQuery = $;
require('foundation-sites');

PNotify.defaults.stack.dir1 = 'up';

Modal.setAppElement('#root');


type State = {
  currentUser: CurrentUserContextType,
};

type Props = {};

class App extends Component<Props, State> {
  history: RouterHistory;

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
        setCurrentUser: function setCurrentUser(data: CurrentUser) {
          this.setState((prevState) => {
            return {
              currentUser: Object.assign(prevState.currentUser, {
                currentUser: data,
              }),
            };
          });
        }.bind(this),
        clearCurrentUser: function clearCurrentUser() {
          this.setState((prevState) => {
            return {
              currentUser: Object.assign(prevState.currentUser, {
                currentUser: {
                  name: undefined,
                  username: undefined,
                },
              }),
            };
          });
        }.bind(this),
      },
    };
  }

  render() {
    const {
      currentUser,
    } = this.state;

    return (
      // $FlowFixMe: React Flow typings are not yet updated to React 16.3
      <React.StrictMode>
        <CurrentUserContext.Provider value={currentUser}>
          <Router history={this.history}>
            <FetchInterceptor>
              <Route path='/' component={Layout} />
            </FetchInterceptor>
          </Router>
        </CurrentUserContext.Provider>
      </React.StrictMode>
    );
  }
}

export default App;
