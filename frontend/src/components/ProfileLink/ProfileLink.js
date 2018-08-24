// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import withCurrentUser from 'components/hocs/withCurrentUser';

import type { CurrentUserContext as CurrentUserContextType } from 'contexts/CurrentUserContext.types';


type Props = {
  ...$Exact<CurrentUserContextType>,
};

class ProfileLink extends Component<Props> {
  render() {
    const {
      currentUser,
    } = this.props;

    return (
      <React.Fragment>
        {
          currentUser.username &&
          (
            <Link to={`/users/${currentUser.username}`}>
              @{currentUser.username}
            </Link>
          )
        }
      </React.Fragment>
    );
  }
}

export default withCurrentUser(ProfileLink);
