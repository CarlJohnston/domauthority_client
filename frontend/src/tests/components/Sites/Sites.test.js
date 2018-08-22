import React from 'react';
import Sinon from 'sinon';
import { mount } from 'enzyme';
import ReactDataGrid from 'react-data-grid';

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
      <Sites
        {...props}
      />
    );
  };

  afterEach(() => {
    if (component) {
      component.unmount();
    }
  });

  it('renders sites', () => {
    const onSiteRemoveStub = Sinon.stub();
    const onSiteUpdateStub = Sinon.stub();

    let sites;

    // TODO test with no site rows once figure out how to test rows

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
      onSiteRemove: onSiteRemoveStub,
      onSiteUpdate: onSiteUpdateStub,
    });
    const reactDataGridComponent = component.find(ReactDataGrid);
    expect(reactDataGridComponent).toHaveLength(1);
    // TODO possibly test row sites if can access without introducing fragility
  });
});
