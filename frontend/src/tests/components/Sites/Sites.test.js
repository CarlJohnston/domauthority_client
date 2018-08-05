import React from 'react';
import Sinon from 'sinon';
import { mount } from 'enzyme';
import { BeatLoader as Loader } from 'react-spinners';

import SiteRow from 'components/SiteRow/SiteRow';
import Sites from 'components/Sites/Sites';

describe('Sites', () => {
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
      const intervalId = setInterval(() => {
        const sites = component.find('#sites');
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
    expect(component.find(SiteRow)).toHaveLength(0);

    sites = [
      {
        title: 'Site 1',
        url: 'http://www.site1.com',
      },
      {
        title: 'Site 2',
        url: 'http://www.site2.com',
      },
    ];
    component.setState({
      loading: false,
      sites: sites,
    });
    expect(component.find(SiteRow)).toHaveLength(2);
    sites.forEach((site) => {
      expect(component.findWhere((node) => {
        return node.type() === SiteRow &&
          node.prop('site') === site;
      })).toHaveLength(1);
    });
  });

  it('onSiteRowRemove removes site row from state and removes actual site', async () => {
    const sites = [
      {
        title: 'Site 1',
        url: 'http://www.site1.com',
      },
      {
        title: 'Site 2',
        url: 'http://www.site2.com',
      },
    ];
    createComponent();
    component.setState({
      sites: sites,
      loading: false,
    });

    const siteToRemove = sites[0];
    const onRemove = component.find(SiteRow).first().prop('onRemove');
    onRemove(Sinon.stub(), siteToRemove);
    const request = requests.pop();
    expect(request).toBeDefined();
    expect(request.url).toEqual('/users/current/sites');
    expect(request.method).toEqual('DELETE');
    request.respond(200);
    await expect(new Promise((resolve) => {
      const intervalId = setInterval(() => {
        component.update();
        const siteRows = component.find(SiteRow);
        if (siteRows.length == sites.length - 1) {
          clearInterval(intervalId);

          resolve(true);
        }
      }, 100);
    })).resolves.toBe(true);
  });
});
