import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import 'promise-polyfill';
import createHistory from "history/createBrowserHistory";
import Modal from 'react-modal';

import 'foundation-sites/dist/css/foundation.min.css'
import 'pnotify/dist/PNotifyBrightTheme.css'

import './App.css';

import 'foundation-icons/foundation-icons.css';

import Layout from 'components/Layout/Layout';
import Login from 'components/ExistingLogin/ExistingLogin';

import CurrentUserContext from 'contexts/CurrentUserContext';
import LoginPopUpContext from 'contexts/LoginPopUpContext';

import Token from 'helpers/Token';

import $ from 'jquery';
window.$ = window.jQuery = $;
require('foundation-sites');

class App extends Component {
  constructor(props) {
    super(props);

    this.history = createHistory();

    var token;
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
            return Object.assign(prevState, {
              currentUser: Object.assign(prevState.currentUser, {
                currentUser: data,
              }),
            });
          });
        }.bind(this),
        clearCurrentUser: function () {
          this.setState((prevState) => {
            return Object.assign(prevState, {
              currentUser: Object.assign(prevState.currentUser, {
                currentUser: {
                  name: null,
                  username: null,
                }
              }),
            });
          });
        }.bind(this),
      },
      loginPopUp: {
        loginPopUp: false,
        setLoginPopUp: function (bool) {
          this.setState((prevState) => {
            return Object.assign(prevState, {
              loginPopUp: Object.assign(prevState.loginPopUp, {
                loginPopUp: bool,
              }),
            });
          });
        }.bind(this),
      },
    };
  }

  render() {
    return (
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <LoginPopUpContext.Provider value={this.state.loginPopUp}>
          <Router history={this.history}>
            <div id='root'>
              <Modal isOpen={this.state.loginPopUp.loginPopUp}>
                <Login />
              </Modal>

              <Route to='/' component={Layout} />
            </div>
          </Router>
        </LoginPopUpContext.Provider>
      </CurrentUserContext.Provider>
    );
  }
}

export default App;
