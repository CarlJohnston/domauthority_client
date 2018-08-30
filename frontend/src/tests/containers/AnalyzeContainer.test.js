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

  it('stays in loading state until site data loaded', async () => {
    createComponent();

    expect(component.find(Loader).exists()).toBe(true);
    expect(component.find(Loader).prop('loading')).toBe(true);
    expect(component.find(Analyze).exists()).toBe(false);

    const sites = [
      {
        id: 1,
        title: 'Site 1',
        url: 'http://www.site1.com',
        metrics: [],
      },
      {
        id: 2,
        title: 'Site 2',
        url: 'http://www.site2.com',
        metrics: [],
      },
    ];
    const request = requests.pop();
    request.respond(
      200,
      {
        'Content-Type': 'application/json',
      },
      JSON.stringify(sites),
    );

    await expect(new Promise((resolve) => {
      let analyzeComponent;
      let loaderComponent;
      const intervalId = setInterval(() => {
        component.update();

        analyzeComponent = component.find(Analyze);
        loaderComponent = component.find(Loader);
        if (analyzeComponent.exists() &&
            loaderComponent.prop('loading') === false) {
          clearInterval(intervalId);

          resolve(true);
        }
      }, 50);
    })).resolves.toBe(true);
  });

  it('passes sites data to Analyze on load', async () => {
    createComponent();

    const sites = [
      {
        id: 1,
        title: 'Site 1',
        url: 'http://www.site1.com',
        metrics: [],
      },
      {
        id: 2,
        title: 'Site 2',
        url: 'http://www.site2.com',
        metrics: [],
      },
    ];
    const request = requests.pop();
    request.respond(
      200,
      {
        'Content-Type': 'application/json',
      },
      JSON.stringify(sites),
    );

    await expect(new Promise((resolve) => {
      let analyzeComponent;
      const intervalId = setInterval(() => {
        component.update();

        analyzeComponent = component.find(Analyze);
        if (analyzeComponent.exists() &&
            JSON.stringify(analyzeComponent.prop('sites')) === JSON.stringify(sites)) {
          clearInterval(intervalId);

          resolve(true);
        }
      }, 50);
    })).resolves.toBe(true);
  });
});
