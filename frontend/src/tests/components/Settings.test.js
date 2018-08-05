import React from 'react';
import { shallow } from 'enzyme';

import App from 'components/App/App';


describe('Settings', () => {
  let component;
  let createComponent = (props) => {
    if (component) {
      component.unmount();
    }

    component = shallow(
      <Settings {...props} />
    );
  };

  afterEach(() => {
    if (component) {
      component.unmount();
    }
  });

  it('settings', () => {
    // stub
  });
});
