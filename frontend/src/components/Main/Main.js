// @flow
import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import './Main.css';

import Layout from 'components/Layout/Layout';
import FetchInterceptor from 'components/FetchInterceptor/FetchInterceptor';

import CurrentUserContext from 'contexts/CurrentUserContext';

import Token from 'helpers/Token';

import type {
  CurrentUserContext as CurrentUserContextType,
  CurrentUser as CurrentUserType,
} from 'contexts/CurrentUserContext.types';
import type { RouterHistory } from 'react-router-dom';


type State = {
  currentUser: CurrentUserContextType,
};

type Props = {};

class Main extends Component<Props, State> {
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
        setCurrentUser: function setCurrentUser(data: CurrentUserType) {
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
      <CurrentUserContext.Provider value={currentUser}>
        <Router history={this.history}>
          <FetchInterceptor>
            <Route path='/' component={Layout} />
          </FetchInterceptor>
        </Router>
      </CurrentUserContext.Provider>
    );
  }
}

export default Main;
