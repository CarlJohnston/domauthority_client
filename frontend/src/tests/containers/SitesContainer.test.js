import React from 'react';
import Sinon from 'sinon';
import { mount } from 'enzyme';
import { BeatLoader as Loader } from 'react-spinners';

import SitesContainer from 'components/containers/SitesContainer';
import Sites from 'components/Sites/Sites';

describe('SitesContainer', () => {
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
      <SitesContainer {...props} />
    );
  };

  afterEach(() => {
    if (component) {
      component.unmount();
    }
  });

  it('shows loader while loading then loads content', async () => {
    expect.assertions(4);

    createComponent();

    expect(component.find(Loader).exists()).toBe(true);
    expect(component.find(Loader).prop('loading')).toBe(true);
    expect(component.find(Sites).exists()).toBe(false);

    const request = requests.pop();
    request.respond(
      200,
      {
        'Content-Type': 'application/json',
      },
      JSON.stringify([
        {
          title: 'Site 1',
          url: 'http://www.site1.com',
        },
      ]),
    );
    component.update();

    await expect(new Promise((resolve) => {
      let sites;
      let loader;
      const intervalId = setInterval(() => {
        component.update();
        loader = component.find(Loader);
        sites = component.find(Sites);
        if (sites.exists() &&
            loader.prop('loading') === false) {
          clearInterval(intervalId);

          resolve(true);
        }
      }, 100);
    })).resolves.toBe(true);
  });

  it('renders sites to child once sites are loaded', async () => {
    expect.assertions(1);

    let sites;
    let request;

//  createComponent();
//  sites = [
//  ];
//  request = requests.pop();
//  request.respond(
//    200,
//    {
//      'Content-Type': 'application/json',
//    },
//    JSON.stringify(sites),
//  );
//  component.update();

    createComponent();
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
    request = requests.pop();
    request.respond(
      200,
      {
        'Content-Type': 'application/json',
      },
      JSON.stringify(sites),
    );
    component.update();
    await expect(new Promise((resolve) => {
      const intervalId = setInterval(() => {
        component.update();
        const componentSites = component.find(Sites);
        if (componentSites &&
            JSON.stringify(componentSites.prop('sites')) === JSON.stringify(sites)) {
          clearInterval(intervalId);

          resolve(true);
        }
      }, 100);
    })).resolves.toBe(true);
  });

  it('onSiteRowRemove prop passed to Sites removes site when present previously', async () => {
    expect.assertions(4);

    let sites;
    let request;

    createComponent();
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
    request = requests.pop();
    request.respond(
      200,
      {
        'Content-Type': 'application/json',
      },
      JSON.stringify(sites),
    );

    const siteToRemove = sites[0];
    await new Promise((resolve) => {
      let sitesComponent;
      const intervalId = setInterval(() => {
        component.update();
        sitesComponent = component.find(Sites);
        if (sitesComponent.exists()) {
          clearInterval(intervalId);

          resolve(true);
        }
      }, 100);
    });
    const onSiteRowRemove = component.find(Sites).prop('onSiteRowRemove');
    onSiteRowRemove({}, siteToRemove);
    request = requests.pop();
    expect(request).toBeDefined();
    expect(request.url).toEqual('/users/current/sites');
    expect(request.method).toEqual('DELETE');
    request.respond(200);
    await expect(new Promise((resolve) => {
      const intervalId = setInterval(() => {
        component.update();
        const sitesComponent = component.find(Sites);
        if (sitesComponent.prop('sites').length === sites.length - 1) {
          // TODO add check that site is gone
          clearInterval(intervalId);

          resolve(true);
        }
      }, 100);
    })).resolves.toBe(true);
  });
});
