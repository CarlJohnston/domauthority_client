import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import LoginLink from 'components/LoginLink/LoginLink';

it('renders without crashing', () => {
  const component = TestRenderer.create(
    <Router>
      <LoginLink />
    </Router>
  );
  component.unmount();
});
