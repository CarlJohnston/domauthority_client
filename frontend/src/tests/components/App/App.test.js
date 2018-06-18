import React from 'react';
import { shallow } from 'enzyme';

import App from 'components/App/App';

import CurrentUserContext from 'contexts/CurrentUserContext';

import Token from 'helpers/Token';

const VALID_CURRENT_USER_DATA = {
  name: 'name',
  username: 'username',
};

describe('app', () => {
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
    Token.clear();
    createComponent();

    var currentUserProvider = findCurrentUserProvider(component);
    Object.values(
      currentUserProvider.prop('value').currentUser
    ).forEach((value) => {
      expect(value).toEqual(null);
    });

    // prior authentication token
    Token.set(VALID_CURRENT_USER_DATA);
    createComponent();

    currentUserProvider = findCurrentUserProvider(component);
    Object.entries(
      currentUserProvider.prop('value').currentUser
    ).forEach(([key, value]) => {
      expect(value).toEqual(VALID_CURRENT_USER_DATA[key]);
    });
  });

  it('setCurrentUser sets currentUser', () => {
    // no prior currentUser
    Token.clear();
    createComponent();

    var currentUserProvider = findCurrentUserProvider(component);
    currentUserProvider.prop('value').setCurrentUser(VALID_CURRENT_USER_DATA);
    component.update();
    currentUserProvider = findCurrentUserProvider(component);
    Object.entries(
      currentUserProvider.prop('value').currentUser
    ).forEach(([key, value]) => {
      expect(value).toEqual(VALID_CURRENT_USER_DATA[key]);
    });

    // prior currentUser
    var data = Object.assign({}, VALID_CURRENT_USER_DATA);
    data.uid = VALID_CURRENT_USER_DATA.uid + 1;
    var currentUserProvider = findCurrentUserProvider(component);
    currentUserProvider.prop('value').setCurrentUser(data);
    component.update(data);
    currentUserProvider = findCurrentUserProvider(component);
    Object.entries(
      currentUserProvider.prop('value').currentUser
    ).forEach(([key, value]) => {
      expect(value).toEqual(data[key]);
    });
  });

  it('clearCurrentUser clears user', () => {
    // no prior user
    Token.clear();
    createComponent();

    var currentUserProvider = findCurrentUserProvider(component);
    currentUserProvider.prop('value').clearCurrentUser();
    Object.entries(
      currentUserProvider.prop('value').currentUser
    ).forEach(([key, value]) => {
      expect(value).toEqual(null);
    });

    // prior user
    currentUserProvider.prop('value').setCurrentUser(VALID_CURRENT_USER_DATA);
    currentUserProvider.prop('value').clearCurrentUser();

    Object.entries(
      currentUserProvider.prop('value').currentUser
    ).forEach(([key, value]) => {
      expect(value).toEqual(null);
    });
  });
});

function findCurrentUserProvider(component) {
  return component.findWhere((node) => {
    return node.prop('value') !== undefined && 'currentUser' in node.prop('value');
  });
}
