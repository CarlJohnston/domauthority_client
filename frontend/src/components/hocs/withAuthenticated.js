import React, { Component } from 'react';
import { Redirect } from 'react-router';

import withCurrentUser from 'components/hocs/withCurrentUser';

function renderAuthenticatedComponent(AuthenticatedComponent, props) {
  if (props.currentUser.uid) {
    return (
      <AuthenticatedComponent {...props} />
    );
  } else {
    return (
      <Redirect to='/login' />
    );
  }
}

function withAuthenticated(AuthenticatedComponent) {
  return withCurrentUser(class extends Component {
    render() {
      return renderAuthenticatedComponent(AuthenticatedComponent, this.props);
    }
  });
}

export default withAuthenticated;
