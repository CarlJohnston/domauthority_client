// @flow

import React, { Component } from 'react';

import withCurrentUser from 'components/hocs/withCurrentUser';

import type { CurrentUserContext as CurrentUserContextType } from 'contexts/CurrentUserContext.types';


type Props = {
  ...$Exact<CurrentUserContextType>,
};

class Profile extends Component<Props> {
  render() {
    return (
      <div>
        <h1>@{this.props.currentUser.username}</h1>
      </div>
    );
  }
}

export default withCurrentUser(Profile);
