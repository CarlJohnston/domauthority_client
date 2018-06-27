import React from 'react';
import { mount } from 'enzyme';
import { Redirect } from 'react-router';
import { MemoryRouter as Router, Route } from 'react-router-dom';

import Login from 'components/Login/Login';

import AuthenticatedRoute from 'components/routes/AuthenticatedRoute';

import Token from 'helpers/Token';

import CurrentUserContext from 'contexts/CurrentUserContext';

const VALID_CURRENT_USER_DATA = {
  name: 'name',
  username: 'username',
};

describe('authenticated route', () => {
  var component;
  var history;
  var createComponent = (options) => {
    var defaultOptions = {
      props: {},
      authenticated: false,
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

    component = mount(
      <Router>
        <CurrentUserContext.Provider value={currentUser}>
          <AuthenticatedRoute path='/'
                              component={Login}
                              {...options.props} />
        </CurrentUserContext.Provider>
      </Router>
    );
  };

  afterEach(() => {
    if (component) {
      component.unmount();
    }
  });

  it('authenticated route restricts route to authenticated users', () => {
    // not authenticated
    createComponent({
      authenticated: false,
    });
    expect(component.find(Redirect).exists()).toBe(true);
    expect(component.find(Login).exists()).toBe(false);

    // authenticated
    createComponent({
      authenticated: true,
    });
    expect(component.find(Redirect).exists()).toBe(false);
    expect(component.find(Login).exists()).toBe(true);
  });
});
