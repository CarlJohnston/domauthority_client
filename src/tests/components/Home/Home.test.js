import React from 'react';
import { shallow } from 'enzyme';

import Home from 'components/Home/Home';

import Token from 'helpers/Token';

describe('home', () => {
  let component;
  let createComponent = (props) => {
    if (component) {
      component.unmount();
    }

    component = shallow(
      <Home {...props} />
    );
  };

  afterEach(() => {
    if (component) {
      component.unmount();
    }
  });

  it('renders properly', () => {

  });
});
