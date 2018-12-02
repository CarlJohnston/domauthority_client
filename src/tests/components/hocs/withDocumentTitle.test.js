import React from 'react';
import { mount } from 'enzyme';
import DocumentTitle from 'react-document-title';

import APPLICATION from 'configs/Application';

import withDocumentTitle from 'components/hocs/withDocumentTitle';


const TestComponent = (props) => {
  return (
    <div>
      test
    </div>
  );
}

describe('withDocumentTitle', () => {
  let component;
  const createComponent = (props, title) => {
    if (component) {
      component.unmount();
    }

    const WithDocumentTitleComponent = withDocumentTitle(TestComponent, title);
    component = mount(
      <WithDocumentTitleComponent
        {...props}
      />
    );
  };

  afterEach(() => {
    if (component) {
      component.unmount();
    }
  });

  it('passes properly modified title to DocumentTitle and renders wrapped component when title provided', () => {
    const title = 'test title';

    createComponent({}, title);

    const documentTitleComponent = component.find(DocumentTitle);
    expect(documentTitleComponent.exists()).toBe(true);
    expect(documentTitleComponent.prop('title')).toEqual(`${title} | ${APPLICATION.title}`);

    expect(component.find(TestComponent).exists()).toBe(true);
  });
});
