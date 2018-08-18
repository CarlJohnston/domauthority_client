// @flow

import React, { Component } from 'react';

import withCurrentUser from 'components/hocs/withCurrentUser';

import type { CurrentUserContext as CurrentUserContextType } from 'contexts/CurrentUserContext.types';


type Props = {
  ...$Exact<CurrentUserContextType>,
};

class Profile extends Component<Props> {
  render() {
    const {
      currentUser,
    } = this.props;

    return (
      <div>
        <h1>
          @{currentUser.username}
        </h1>
      </div>
    );
  }
}

export default withCurrentUser(Profile);
