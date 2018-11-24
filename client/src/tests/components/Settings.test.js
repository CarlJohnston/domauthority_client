import React from 'react';
import { shallow } from 'enzyme';


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
