import React from 'react';
import Sinon from 'sinon';
import { mount } from 'enzyme';
import { BeatLoader as Loader } from 'react-spinners';

import AnalyzeContainer from 'components/containers/AnalyzeContainer';
import Analyze from 'components/Analyze/Analyze';


describe('AnalyzeContainer', () => {
  let xhr;
  const requests = [];
  beforeAll(() => {
    xhr = Sinon.useFakeXMLHttpRequest();
    xhr.onCreate = (xhrRequest) => {
      requests.push(xhrRequest);
    };
  });

  afterAll(() => {
    xhr.restore();
  });

  let component;
  const createComponent = (props) => {
    if (component) {
      component.unmount();
    }

    component = mount(
      <AnalyzeContainer
        {...props}
      />
    );
  };

  afterEach(() => {
    if (component) {
      component.unmount();
    }
  });

  it('mounts', () => {
    createComponent();
  });
});
