import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Layout from '../../../components/Layout/Layout';

it('renders without crashing', () => {
  const component = TestRenderer.create(
    <Router>
      <Layout />
    </Router>
  );
  component.unmount();
});
