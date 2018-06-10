import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Link } from 'react-router-dom';
import { MemoryRouter as Router } from 'react-router-dom';

import AuthenticationProgress from 'components/AuthenticationProgress/AuthenticationProgress';

it('renders without crashing', () => {
  const component = TestRenderer.create(
    <Router>
      <AuthenticationProgress />
    </Router>
  );
  component.unmount();
});
