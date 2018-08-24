import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter as Router } from 'react-router-dom';

import ProfileLink from 'components/ProfileLink/ProfileLink';

import CurrentUserContext from 'contexts/CurrentUserContext';


const VALID_CURRENT_USER_DATA = {
  name: 'name',
  username: 'username',
};

describe('profile link', () => {
  let component;

  const currentUser = {
    currentUser: VALID_CURRENT_USER_DATA,
    setCurrentUser: null,
    clearCurrentUser: null,
  };

  const createComponent = () => {
    component = mount(
      <Router>
        <CurrentUserContext.Provider value={currentUser}>
          <ProfileLink />
        </CurrentUserContext.Provider>
      </Router>
    );
  };

  afterEach(() => {
    if (component) {
      component.unmount();
    }
  });

  it('mounts without breaking', () => {
    createComponent();
  });
});
