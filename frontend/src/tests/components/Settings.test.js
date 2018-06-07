import React from 'react';
import { shallow } from 'enzyme';

import App from 'components/App/App';

import CurrentUserContext from 'contexts/CurrentUserContext';

import AuthenticationToken from 'helpers/AuthenticationToken';

const VALID_CURRENT_USER_DATA = {
  uid: 1,
  name: 'name',
  username: 'username',
  accessToken: 'blah',
  client: 'blah',
};

describe('settings', () => {
  var authenticationToken = new AuthenticationToken();
  var component;
  var createComponent = (props) => {
    if (component) {
      component.unmount();
    }

    component = shallow(
      <App {...props} />
    );
  };

  afterEach(() => {
    if (component) {
      component.unmount();
    }
  });

  it('sets authentication token on initialization', () => {
    // no prior authentication token
    authenticationToken.clear();
    createComponent();

    Object.values(
      component.prop('value').currentUser
    ).forEach((value) => {
      expect(value).toEqual(null);
    });

    // prior authentication token
    authenticationToken.set(VALID_CURRENT_USER_DATA);
    createComponent();

    Object.entries(
      component.prop('value').currentUser
    ).forEach(([key, value]) => {
      expect(value).toEqual(VALID_CURRENT_USER_DATA[key]);
    });
  });

  it('setCurrentUser sets currentUser', () => {
    // no prior currentUser
    authenticationToken.clear();
    createComponent();

    component.prop('value').setCurrentUser(VALID_CURRENT_USER_DATA);
    component.update();
    Object.entries(
      component.prop('value').currentUser
    ).forEach(([key, value]) => {
      expect(value).toEqual(VALID_CURRENT_USER_DATA[key]);
    });

    // prior currentUser
    var data = Object.assign({}, VALID_CURRENT_USER_DATA);
    data.uid = VALID_CURRENT_USER_DATA.uid + 1;
    component.prop('value').setCurrentUser(data);
    component.update(data);
    Object.entries(
      component.prop('value').currentUser
    ).forEach(([key, value]) => {
      expect(value).toEqual(data[key]);
    });
  });

  it('clearCurrentUser clears user', () => {
    // no prior user
    authenticationToken.clear();
    createComponent();

    component.prop('value').clearCurrentUser();
    Object.entries(
      component.prop('value').currentUser
    ).forEach(([key, value]) => {
      expect(value).toEqual(null);
    });

    // prior user
    component.prop('value').setCurrentUser(VALID_CURRENT_USER_DATA);
    component.prop('value').clearCurrentUser();

    Object.entries(
      component.prop('value').currentUser
    ).forEach(([key, value]) => {
      expect(value).toEqual(null);
    });
  });
});
