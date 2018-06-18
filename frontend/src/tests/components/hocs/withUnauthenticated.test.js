import React from 'react';
import { mount } from 'enzyme';
import { Redirect } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login, { LoginWithoutUnauthenticated } from 'components/Login/Login';

import Token from 'helpers/Token';

import CurrentUserContext from 'contexts/CurrentUserContext';

const VALID_CURRENT_USER_DATA = {
  name: 'name',
  username: 'username',
};

describe('withUnauthenticated', () => {
  var component;
  var history;
  var createComponent = (options) => {
    var defaultOptions = {
      props: {},
      authenticated: false,
      protectedComponent: false,
    };
    options = Object.assign(defaultOptions, options);

    if (component) {
      component.unmount();
    }

    var currentUserData = {};
    if (options.authenticated) {
      currentUserData = VALID_CURRENT_USER_DATA;
    } else {
      Object.entries(VALID_CURRENT_USER_DATA).forEach(([key, value]) => {
        currentUserData[key] = null;
      });
    }
    var currentUser = {
      currentUser: currentUserData,
      setCurrentUser: null,
      clearCurrentUser: null,
    };

    if (options.protectedComponent) {
      component = mount(
        <Router>
          <CurrentUserContext.Provider value={currentUser}>
            <Login {...options.props} />
          </CurrentUserContext.Provider>
        </Router>
      );
    } else {
      component = mount(
        <Router>
          <CurrentUserContext.Provider value={currentUser}>
            <LoginWithoutUnauthenticated {...options.props} />
          </CurrentUserContext.Provider>
        </Router>
      );
    }
  };

  afterEach(() => {
    if (component) {
      component.unmount();
    }
  });

  it('protected component restricts route to authenticated users', () => {
    // not authenticated
    createComponent({
      authenticated: false,
      protectedComponent: true,
    });
    expect(component.find(Redirect)).toHaveLength(0);
    expect(component.find(LoginWithoutUnauthenticated).exists()).toBe(true);

    createComponent({
      authenticated: false,
      protectedComponent: false,
    });
    expect(component.find(Redirect)).toHaveLength(0);
    expect(component.find(LoginWithoutUnauthenticated).exists()).toBe(true);

    // authenticated
    createComponent({
      authenticated: true,
      protectedComponent: true,
    });
    expect(component.find(Redirect)).toHaveLength(1);
    expect(component.find(LoginWithoutUnauthenticated).exists()).toBe(false);

    createComponent({
      authenticated: true,
      protectedComponent: false,
    });
    expect(component.find(Redirect)).toHaveLength(0);
    expect(component.find(LoginWithoutUnauthenticated).exists()).toBe(true);
  });
});
