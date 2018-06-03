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

describe('app', () => {
  var authenticationToken = new AuthenticationToken();
  var component;
  var createApp = (props) => {
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
    createApp();

    expect(component.find(CurrentUserContext.Provider))
    Object.values(component.prop('value').currentUser).forEach((value) => {
      expect(value).toEqual(null);
    });

    // prior authentication token
    authenticationToken.set(VALID_CURRENT_USER_DATA);
    createApp();

    expect(component.find(CurrentUserContext.Provider))
    Object.entries(component.prop('value').currentUser).forEach(([key, value]) => {
      expect(value).toEqual(VALID_CURRENT_USER_DATA[key]);
    });
  });

  it('setCurrentUser sets currentUser', () => {
    // no prior currentUser

    // prior currentUser
  });
});
