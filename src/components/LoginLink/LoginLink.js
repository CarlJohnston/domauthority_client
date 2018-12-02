// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import withCurrentUser from 'components/hocs/withCurrentUser';


type Props = {
};

class LoginLink extends Component<Props> {
  render() {
    return (
      <Link to='/login'>
        Login
      </Link>
    );
  }
}

export default withCurrentUser(LoginLink);
