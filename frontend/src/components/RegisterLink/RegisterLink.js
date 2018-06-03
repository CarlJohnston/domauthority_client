import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import withCurrentUser from 'components/hocs/withCurrentUser';

class RegisterLink extends Component {
  render() {
    return (
      <Link to='/register'>
        Register
      </Link>
    );
  }
}

export default withCurrentUser(RegisterLink);
