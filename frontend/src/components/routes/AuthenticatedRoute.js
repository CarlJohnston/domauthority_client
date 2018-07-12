// @flow

import React, { Component } from 'react';

import withCurrentUser from 'components/hocs/withCurrentUser';

import AuthenticatedRouteBase from 'components/routes/AuthenticatedRouteBase';

type Props = {
};

class AuthenticatedRoute extends Component<Props> {
  render() {
    return (
      <AuthenticatedRouteBase {...this.props} authenticated={true} />
    );
  }
};

export default withCurrentUser(AuthenticatedRoute);
