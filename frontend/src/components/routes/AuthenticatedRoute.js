import React, { Component } from 'react';

import withCurrentUser from 'components/hocs/withCurrentUser';

import AuthenticatedRouteBase from 'components/routes/AuthenticatedRouteBase';

class AuthenticatedRoute extends Component {
  render() {
    return (
      <AuthenticatedRouteBase {...this.props} authenticated={true} />
    );
  }
};

export default withCurrentUser(AuthenticatedRoute);
