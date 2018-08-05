import React from 'react';
import Sinon from 'sinon';
import { mount } from 'enzyme';

import SiteRow from 'components/SiteRow/SiteRow';

describe('SiteRow', () => {
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
      <table>
        <tbody>
          <SiteRow {...props} />
        </tbody>
      </table>
    );
  };

  afterEach(() => {
    if (component) {
      component.unmount();
    }
  });

  it('renders close button that fires onRemove prop on click', () => {
    const onRemoveSpy = Sinon.spy();
    let site = {
      title: 'Site 1',
      url: 'http://www.site1.com',
    };
    createComponent({
      onRemove: onRemoveSpy,
      site: site,
    });

    // TODO decouple from the UI
    let removeLink = component.find('#remove')
    expect(removeLink.length).toEqual(1);

    removeLink.simulate('click');
    expect(onRemoveSpy.calledOnce).toBe(true);
  });
});
