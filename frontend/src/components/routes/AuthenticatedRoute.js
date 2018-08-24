// @flow

import React, { Component } from 'react';

import withCurrentUser from 'components/hocs/withCurrentUser';

import AuthenticatedRouteBase from 'components/routes/AuthenticatedRouteBase';

import type { ComponentType } from 'react';
import type { CurrentUser as CurrentUserType } from 'contexts/CurrentUserContext.types';


type Props = {
  component: ComponentType<{}>,
  currentUser: CurrentUserType,
  path: string,
};

class AuthenticatedRoute extends Component<Props> {
  render() {
    return (
      <AuthenticatedRouteBase
        {...this.props}
        authenticated={true}
      />
    );
  }
}

export default withCurrentUser(AuthenticatedRoute);
