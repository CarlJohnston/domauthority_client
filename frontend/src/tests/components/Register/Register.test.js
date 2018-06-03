import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Register from 'components/Register/Register';

it('renders without crashing', () => {
  const component = TestRenderer.create(
    <Router>
      <Register />
    </Router>
  );
  component.unmount();
});
