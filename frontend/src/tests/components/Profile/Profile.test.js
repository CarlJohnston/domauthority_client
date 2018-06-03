import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Profile from 'components/Profile/Profile';

it('renders without crashing', () => {
  const component = TestRenderer.create(
    <Router>
      <Profile />
    </Router>
  );
  component.unmount();
});
