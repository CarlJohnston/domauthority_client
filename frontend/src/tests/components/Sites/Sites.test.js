import React from 'react';
import Sinon from 'sinon';
import { mount } from 'enzyme';

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

  it('renders sites', () => {
    const onSiteRowRemoveStub = Sinon.stub();

    let sites;

    sites = [
    ];
    createComponent({
      sites: sites,
      onSiteRowRemove: onSiteRowRemoveStub,
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
    createComponent({
      sites: sites,
      onSiteRowRemove: onSiteRowRemoveStub,
    });
    sites.forEach((site) => {
      expect(component.findWhere((node) => {
        return node.type() === SiteRow &&
          node.prop('site').title === site.title &&
          node.prop('site').url === site.url &&
          node.prop('onRemove') === onSiteRowRemoveStub;
      })).toHaveLength(1);
    });
  });
});
