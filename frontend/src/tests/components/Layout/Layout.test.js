import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Link } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'

import Layout from '../../../components/Layout/Layout';

it('renders without crashing', () => {
  const component = TestRenderer.create(
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
  component.unmount();
});
