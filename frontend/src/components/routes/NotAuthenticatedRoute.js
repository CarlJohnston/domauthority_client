import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';

import withCurrentUser from 'components/hocs/withCurrentUser';

import AuthenticatedRouteBase from 'components/routes/AuthenticatedRouteBase';

class NotAuthenticatedRoute extends Component {
  render() {
    return (
      <AuthenticatedRouteBase {...this.props} authenticated={false} />
    );
  }
};

export default withCurrentUser(NotAuthenticatedRoute);
