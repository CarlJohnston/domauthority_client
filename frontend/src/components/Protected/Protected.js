import React, { Component } from 'react';

import AuthenticationProgress from 'components/AuthenticationProgress/AuthenticationProgress';

import withCurrentUser from 'components/hocs/withCurrentUser';

function renderProtectedComponent(ProtectedComponent, props) {
  if (props.isAuthenticated) {
    return (
      <ProtectedComponent {...props} />
    );
  } else {
    return (
      <AuthenticationProgress />
    );
  }
}

function Protected(ProtectedComponent) {
  return withCurrentUser(class extends Component {
    render() {
      return renderProtectedComponent(ProtectedComponent, this.props);
    }
  });
}

export default Protected;
