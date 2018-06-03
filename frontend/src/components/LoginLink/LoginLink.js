import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import withCurrentUser from 'components/hocs/withCurrentUser';

class LoginLink extends Component {
  render() {
    return (
      <Link to='/login'>
        Login
      </Link>
    );
  }
}

export default withCurrentUser(LoginLink);
