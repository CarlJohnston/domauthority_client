import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';

import Header from 'components/Header/Header';
import ProfileLink from 'components/ProfileLink/ProfileLink';
import LogoutLink from 'components/LogoutLink/LogoutLink';
import LoginLink from 'components/LoginLink/LoginLink';
import RegisterLink from 'components/RegisterLink/RegisterLink';
import SettingsLink from 'components/SettingsLink/SettingsLink';

import CurrentUserContext from 'contexts/CurrentUserContext';

import AuthenticationToken from 'helpers/AuthenticationToken';

const VALID_CURRENT_USER_DATA = {
  uid: 1,
  name: 'name',
  username: 'username',
  accessToken: 'blah',
  client: 'blah',
};

describe('header', () => {
  var authenticationToken = new AuthenticationToken();
  var component;
  var createComponent = (props, authenticated) => {
    if (component) {
      component.unmount();
    }

    var currentUser = {
      currentUser: VALID_CURRENT_USER_DATA,
      setCurrentUser: null,
      clearCurrentUser: null,
    };
    if (authenticated) {
      component = mount(
        <Router>
          <CurrentUserContext.Provider value={currentUser}>
            <Header {...props} />
          </CurrentUserContext.Provider>
        </Router>
      );
    } else {
      component = mount(
        <Router>
          <Header {...props} />
        </Router>
      );
    }
  };

  afterEach(() => {
    if (component) {
      component.unmount();
    }
  });

  it('displays login/register when logged out', () => {
    authenticationToken.clear();
    createComponent(null, false);

    expect(component.find(LoginLink)).toHaveLength(1);
    expect(component.find(RegisterLink)).toHaveLength(1);

    expect(component.find(ProfileLink)).toHaveLength(0);
    expect(component.find(SettingsLink)).toHaveLength(0);
    expect(component.find(LogoutLink)).toHaveLength(0);
  });

  it('displays link to profile/logout links when logged in', () => {
    authenticationToken.set(VALID_CURRENT_USER_DATA);
    createComponent(null, true);

    expect(component.find(LoginLink)).toHaveLength(0);
    expect(component.find(RegisterLink)).toHaveLength(0);

    expect(component.find(ProfileLink)).toHaveLength(1);
    expect(component.find(SettingsLink)).toHaveLength(1);
    expect(component.find(LogoutLink)).toHaveLength(1);
  });
});
