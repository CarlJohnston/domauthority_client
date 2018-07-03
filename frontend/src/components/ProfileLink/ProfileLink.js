import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import withCurrentUser from 'components/hocs/withCurrentUser';

import type { CurrentUserContext as CurrentUserContextType } from 'contexts/CurrentUserContext.types';


type Props = {
  ...$Exact<CurrentUserContextType>,
};

class ProfileLink extends Component<Props> {
  render() {
    return (
      <Link to={`/users/${this.props.currentUser.username}`}>
        @{this.props.currentUser.username}
      </Link>
    );
  }
}

export default withCurrentUser(ProfileLink);
