// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import withCurrentUser from 'components/hocs/withCurrentUser';

import type { CurrentUserContext as CurrentUserContextType } from 'contexts/CurrentUserContext.types';


type Props = {
  ...$Exact<CurrentUserContextType>,
};

class RegisterLink extends Component<Props> {
  render() {
    return (
      <Link to='/register'>
        Register
      </Link>
    );
  }
}

export default withCurrentUser(RegisterLink);
