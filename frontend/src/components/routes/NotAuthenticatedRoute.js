import React, { Component } from 'react';

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
