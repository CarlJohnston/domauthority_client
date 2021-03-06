import React from 'react';
import { mount } from 'enzyme';
import { Redirect } from 'react-router';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Settings from 'components/Settings/Settings';

import NotAuthenticatedRoute from 'components/routes/NotAuthenticatedRoute';

import CurrentUserContext from 'contexts/CurrentUserContext';

const VALID_CURRENT_USER_DATA = {
  name: 'name',
  username: 'username',
};

const NOT_AUTHENTICATED_PATH = '/not-authenticated';
const ROOT_PATH = '/';

describe('authenticated route', () => {
  let component;
  let history;
  const createComponent = (newOptions) => {
    const defaultOptions = {
      props: {
        path: NOT_AUTHENTICATED_PATH,
        component: Settings,
      },
      authenticated: false,
    };
    const options = Object.assign(defaultOptions, newOptions);

    history = createMemoryHistory({
      initialEntries: [
        options.props.path,
      ],
      initialIndex: 0,
    });

    if (component) {
      component.unmount();
    }

    let currentUserData = {};
    if (options.authenticated) {
      currentUserData = VALID_CURRENT_USER_DATA;
    } else {
      Object.entries(VALID_CURRENT_USER_DATA).forEach(([key, value]) => {
        currentUserData[key] = null;
      });
    }
    const currentUser = {
      currentUser: currentUserData,
      setCurrentUser: null,
      clearCurrentUser: null,
    };

    component = mount(
      <Router history={history}>
        <CurrentUserContext.Provider value={currentUser}>
          <NotAuthenticatedRoute
            {...options.props}
          />
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
    expect(history.location.pathname).toEqual(NOT_AUTHENTICATED_PATH);
    expect(component.find(Settings).exists()).toBe(true);

    // authenticated
    createComponent({
      authenticated: true,
    });
    expect(history.location.pathname).toEqual(ROOT_PATH);
    expect(component.find(Settings).exists()).toBe(false);
  });
});
