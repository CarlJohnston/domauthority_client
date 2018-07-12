// @flow

import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';

import withCurrentUser from 'components/hocs/withCurrentUser';

import type { ComponentType } from 'react';
import type { CurrentUser as CurrentUser } from 'contexts/CurrentUserContext.types';


type Props = {
  component: ComponentType<{}>,
  currentUser: CurrentUser,
  authenticated: boolean,
};

class AuthenticatedRouteBase extends Component<Props> {
  render() {
    let { component: Component,
          currentUser,
          authenticated,
          ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={
          (props) => {
            let currentUserUsername = currentUser.username;
            if ((authenticated && currentUserUsername) ||
                (!authenticated && !currentUserUsername)) {
              return (
                <Component {...props} />
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
};

export default withCurrentUser(AuthenticatedRouteBase);
