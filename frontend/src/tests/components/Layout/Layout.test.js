import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import { MemoryRouter as Router } from 'react-router-dom';

import Layout from 'components/Layout/Layout';

it('renders without crashing', () => {
  const component = shallow(
    <Router>
      <Layout />
    </Router>
  );
  component.unmount();
});
