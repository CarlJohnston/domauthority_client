import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Forgot from 'components/Forgot/Forgot';

it('renders without crashing', () => {
  const component = TestRenderer.create(
    <Router>
      <Forgot />
    </Router>
  );
  component.unmount();
});
