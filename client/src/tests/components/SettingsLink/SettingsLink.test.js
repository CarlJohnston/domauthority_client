import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Link } from 'react-router-dom';
import { MemoryRouter as Router } from 'react-router-dom';

import SettingsLink from 'components/SettingsLink/SettingsLink';

it('renders without crashing', () => {
  const component = TestRenderer.create(
    <Router>
      <SettingsLink />
    </Router>
  );
  component.unmount();
});
