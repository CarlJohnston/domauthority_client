import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Login from 'components/Login/Login';

it('renders without crashing', () => {
  const component = TestRenderer.create(
    <Router>
      <Login />
    </Router>
  );
  component.unmount();
});
