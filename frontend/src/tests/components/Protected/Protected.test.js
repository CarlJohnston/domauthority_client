import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Settings from 'components/Settings/Settings';
import Home from 'components/Home/Home';

import CurrentUserContext from 'contexts/CurrentUserContext';

const VALID_CURRENT_USER_DATA = {
  uid: 1,
  name: 'name',
  username: 'username',
  accessToken: 'blah',
  client: 'blah',
};

describe('protected', () => {
  var component;
  var history;
  var createComponent = (options) => {
    var defaultOptions = {
      props: {},
      authenticated: false,
      protectedComponent: false,
      path: '/',
    };
    options = Object.assign(defaultOptions, options);
    history = [
      options.path,
    ];

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
            <Settings {...options.props} history={history} />
          </CurrentUserContext.Provider>
        </Router>
      );
    } else {
      component = mount(
        <Router>
          <CurrentUserContext.Provider value={currentUser}>
            <Home {...options.props} history={history} />
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
    var path = '/settings';
    createComponent({
      path: path,
      authenticated: false,
      protectedComponent: true,
    });
    expect(history[history.length - 1]).not.toEqual(path);

    path = '/';
    createComponent({
      path: path,
      authenticated: false,
      protectedComponent: false,
    });
    expect(history[history.length - 1]).toEqual(path);

    // authenticated
    path = '/settings';
    createComponent({
      path: path,
      authenticated: true,
      protectedComponent: true,
    });
    expect(history[history.length - 1]).toEqual(path);

    path = '/';
    createComponent({
      path: path,
      authenticated: true,
      protectedComponent: false,
    });
    expect(history[history.length - 1]).toEqual(path);
  });
});
