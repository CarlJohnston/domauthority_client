import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';

import withCurrentUser from 'components/hocs/withCurrentUser';

import AuthenticatedRouteBase from 'components/routes/AuthenticatedRouteBase';

class AuthenticatedRoute extends Component {
  render() {
    let { component: Component, currentUser, ...rest } = this.props;

    return (
      <AuthenticatedRouteBase {...this.props} authenticated={true} />
    );
  }
};

export default withCurrentUser(AuthenticatedRoute);
