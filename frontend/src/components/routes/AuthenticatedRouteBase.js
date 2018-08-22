// @flow

import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';

import withCurrentUser from 'components/hocs/withCurrentUser';

import type { ComponentType } from 'react';
import type { CurrentUser as CurrentUserType } from 'contexts/CurrentUserContext.types';


type Props = {
  component: ComponentType<{}>,
  currentUser: CurrentUserType,
  authenticated: boolean,
  path: string,
};

class AuthenticatedRouteBase extends Component<Props> {
  render() {
    const {
      component: Child,
      currentUser,
      authenticated,
      path,
      ...rest
    } = this.props;

    return (
      <Route
        path={path}
        {...rest}
        render={
          (props) => {
            const currentUserUsername = currentUser.username;
            if ((authenticated && currentUserUsername) ||
                (!authenticated && !currentUserUsername)) {
              return (
                <Child {...props} />
              );
            } else {
              return (
                <Redirect to='/login' />
              );
            }
          }
        }
      />
    );
  }
}

export default withCurrentUser(AuthenticatedRouteBase);
