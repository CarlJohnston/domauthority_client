import React from 'react';
import TestRenderer from 'react-test-renderer';
import App from '../src/components/App/App';

it('renders without crashing', () => {
  const component = TestRenderer.create(
    <App />
  );
  component.unmount();
});
