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
      <SitesContainer
        {...props}
      />
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
          id: 1,
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

    // TODO figure out how to test negative case w/ no sites

    createComponent();
    sites = [
      {
        id: 1,
        title: 'Site 1',
        url: 'http://www.site1.com',
      },
      {
        id: 2,
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

  it('onSiteRemove prop passed to Sites removes site when present previously', async () => {
    expect.assertions(4);

    let sites;
    let request;

    createComponent();
    sites = [
      {
        id: 1,
        title: 'Site 1',
        url: 'http://www.site1.com',
      },
      {
        id: 2,
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
    const onSiteRemove = component.find(Sites).prop('onSiteRemove');
    onSiteRemove(siteToRemove);
    request = requests.pop();
    expect(request).toBeDefined();
    expect(request.url).toEqual(`/users/current/sites/${siteToRemove.id}`);
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

  it('onSiteUpdate prop passed to Sites updates site', async () => {
    expect.assertions(5);

    let sites;
    let request;

    createComponent();
    sites = [
      {
        id: 1,
        title: 'Site 1',
        url: 'http://www.site1.com',
      },
      {
        id: 2,
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
    const onSiteUpdate = component.find(Sites).prop('onSiteUpdate');
    const siteToUpdateIndex = 0;
    const siteToBeUpdated = sites[siteToUpdateIndex];
    siteToBeUpdated.title = 'New Site 1';
    onSiteUpdate(siteToBeUpdated);
    request = requests.pop();
    expect(request).toBeDefined();
    expect(request.url).toEqual(`/users/current/sites/${siteToBeUpdated.id}`);
    expect(request.requestBody).toEqual(JSON.stringify(siteToBeUpdated));
    expect(request.method).toEqual('PUT');
    request.respond(200);
    await expect(new Promise((resolve) => {
      const intervalId = setInterval(() => {
        component.update();
        const sitesComponent = component.find(Sites);
        const updatedSites = sitesComponent.prop('sites');
        const updatedSite = updatedSites[siteToUpdateIndex];
        if (siteToBeUpdated.title === updatedSite.title &&
            siteToBeUpdated.url === updatedSite.url) {
          const restSitesBefore = sites.filter(({ title, url }) => {
            return url !== updatedSite.url;
          });
          const restSitesUpdated = updatedSites.filter(({ title, url }) => {
            return url !== updatedSite.url;
          });

          if (JSON.stringify(restSitesBefore) === JSON.stringify(restSitesUpdated)) {
            clearInterval(intervalId);

            resolve(true);
          }
        }
      }, 100);
    })).resolves.toBe(true);
  });

  it('onSiteCreate prop passed to Sites creates site and calls callback', async () => {
    expect.assertions(6);

    let sites;
    let request;

    createComponent();
    sites = [
      {
        id: 1,
        title: 'Site 1',
        url: 'http://www.site1.com',
      },
      {
        id: 2,
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
    const onSiteCreate = component.find(Sites).prop('onSiteCreate');
    const newSite = {
      id: 3,
      title: 'Site 3',
      url: 'http://wwww.site3.com',
    };
    const callback = Sinon.spy();
    onSiteCreate(newSite, callback);
    request = requests.pop();
    expect(request).toBeDefined();
    expect(request.url).toEqual('/users/current/sites');
    expect(request.requestBody).toEqual(JSON.stringify({
      site: newSite,
    }));
    expect(request.method).toEqual('POST');
    request.respond(
      200,
      {
        'Content-Type': 'application/json',
      },
      JSON.stringify(newSite)
    );
    await expect(new Promise((resolve) => {
      const intervalId = setInterval(() => {
        component.update();
        const sitesComponent = component.find(Sites);
        const updatedSites = sitesComponent.prop('sites');
        const newUpdatedSite = updatedSites[updatedSites.length - 1];
        if (sites.length + 1 === updatedSites.length &&
            newSite.id === newUpdatedSite.id &&
            newSite.title === newUpdatedSite.title &&
            newSite.url === newUpdatedSite.url) {
          if (JSON.stringify(sites) === JSON.stringify(updatedSites.slice(0, -1))) {
            clearInterval(intervalId);

            resolve(true);
          }
        }
      }, 100);
    })).resolves.toBe(true);

    expect(callback.calledOnce).toBe(true);
  });

  it('onSiteCreate prop passed to Sites does not create site on invalid data + response but still calls callback', async () => {
    expect.assertions(6);

    let sites;
    let request;

    createComponent();
    sites = [
      {
        id: 1,
        title: 'Site 1',
        url: 'http://www.site1.com',
      },
      {
        id: 2,
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
    const onSiteCreate = component.find(Sites).prop('onSiteCreate');
    const newSite = {
      id: 3,
      title: 'Site 3',
    };
    const callback = Sinon.spy();
    onSiteCreate(newSite, callback);
    request = requests.pop();
    expect(request).toBeDefined();
    expect(request.url).toEqual('/users/current/sites');
    expect(request.requestBody).toEqual(JSON.stringify({
      site: newSite,
    }));
    expect(request.method).toEqual('POST');
    request.respond(
      409,
      {
        'Content-Type': 'application/json',
      },
      JSON.stringify(newSite),
    );
    // TODO figure out better way to test this without magic number
    await expect(new Promise((resolve, reject) => {
      setTimeout(() => {
        component.update();
        const sitesComponent = component.find(Sites);
        const updatedSites = sitesComponent.prop('sites');
        if (sites.length === updatedSites.length) {
          if (JSON.stringify(sites) === JSON.stringify(updatedSites)) {
            reject(false);
          } else {
            resolve(true);
          }
        }
      }, 1000);
    })).rejects.toBe(false);

    expect(callback.calledOnce).toBe(true);
  });
});
