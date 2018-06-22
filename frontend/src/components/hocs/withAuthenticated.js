import React, { Component } from 'react';
import { Redirect } from 'react-router';

import withCurrentUser from 'components/hocs/withCurrentUser';
import withLoginPopUp from 'components/hocs/withLoginPopUp';

function renderAuthenticatedComponent(AuthenticatedComponent, props, state) {
  if (props.currentUser.username) {
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
  return withLoginPopUp(withCurrentUser(class extends Component {
    render() {
      return renderAuthenticatedComponent(AuthenticatedComponent, this.props, this.state);
    }
  }));
}

export default withAuthenticated;
