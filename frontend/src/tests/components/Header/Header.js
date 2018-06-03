import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from 'components/Header/Header';

it('renders without crashing', () => {
  const component = TestRenderer.create(
    <Router>
      <Header />
    </Router>
  );
  component.unmount();
});
