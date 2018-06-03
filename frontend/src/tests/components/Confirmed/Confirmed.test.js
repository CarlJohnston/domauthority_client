import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Confirmed from 'components/Confirmed/Confirmed';

it('renders without crashing', () => {
  const component = TestRenderer.create(
    <Router>
      <Confirmed />
    </Router>
  );
  component.unmount();
});
