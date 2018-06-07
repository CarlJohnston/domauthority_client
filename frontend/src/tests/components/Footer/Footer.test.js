import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Link } from 'react-router-dom';
import { MemoryRouter as Router } from 'react-router-dom';

import Footer from 'components/Footer/Footer';

it('renders without crashing', () => {
  const component = TestRenderer.create(
    <Router>
      <Footer />
    </Router>
  );
  component.unmount();
});
