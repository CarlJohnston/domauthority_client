import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';

import withCurrentUser from 'components/hocs/withCurrentUser';

class AuthenticatedRouteBase extends Component {
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
