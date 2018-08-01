import React from 'react';
import Sinon from 'sinon';
import { mount } from 'enzyme';
import { BeatLoader as Loader } from 'react-spinners';

import Sites from 'components/Sites/Sites';
import SiteRow from 'components/SiteRow/SiteRow';

describe('Sites', () => {
  let xhr;
  let requests = [];
  beforeAll(() => {
    xhr = Sinon.useFakeXMLHttpRequest();
    xhr.onCreate = function (xhr) {
      requests.push(xhr);
    };
  });

  afterAll(() => {
    xhr.restore();
  });

  let component;
  let createComponent = (props) => {
    if (component) {
      component.unmount();
    }

    component = mount(
      <Sites {...props} />
    );
  };

  afterEach(() => {
    if (component) {
      component.unmount();
    }
  });

  it('shows loader while loading then loads content', async () => {
    expect.assertions(2);

    createComponent();

    expect(component.find(Loader).exists()).toBe(true);

    component.setState({
      loading: false,
    });
    component.update();

    await expect(new Promise((resolve) => {
      let intervalId = setInterval(() => {
        let sites = component.find('#sites');
        if (sites.exists()) {
          clearInterval(intervalId);

          resolve(true);
        }
      }, 100);
    })).resolves.toBe(true);
  });

  it('renders sites', () => {
    createComponent();
    let sites;

    sites = [
    ];
    component.setState({
      loading: false,
      sites: sites,
    });
    expect(component.find(SiteRow).length).toEqual(0);

    sites = [
      {
        title: 'Site 1',
        url: 'http://www.site1.com',
      },
    ];
    component.setState({
      loading: false,
      sites: sites,
    });
    expect(component.find(SiteRow).length).toEqual(1);
    sites.forEach((site) => {
      expect(component.findWhere((node) => {
        return node.type() === SiteRow &&
          node.prop('site') === site;
      }).length).toEqual(1);
    });
  });
});
