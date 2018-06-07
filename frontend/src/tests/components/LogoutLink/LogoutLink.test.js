import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Link } from 'react-router-dom';
import { MemoryRouter as Router } from 'react-router-dom';

import LogoutLink from 'components/LogoutLink/LogoutLink';

it('renders without crashing', () => {
  const component = TestRenderer.create(
    <Router>
      <LogoutLink />
    </Router>
  );
  component.unmount();
});
