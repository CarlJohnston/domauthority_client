import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Link } from 'react-router-dom';
import { MemoryRouter as Router } from 'react-router-dom';

import ProfileLink from 'components/ProfileLink/ProfileLink';

it('renders without crashing', () => {
  const component = TestRenderer.create(
    <Router>
      <ProfileLink />
    </Router>
  );
  component.unmount();
});
