import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Link } from 'react-router-dom';
import { MemoryRouter as Router } from 'react-router-dom';

import RegisterLink from 'components/RegisterLink/RegisterLink';

it('renders without crashing', () => {
  const component = TestRenderer.create(
    <Router>
      <RegisterLink />
    </Router>
  );
  component.unmount();
});
