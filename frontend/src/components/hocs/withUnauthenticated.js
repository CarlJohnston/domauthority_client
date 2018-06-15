import React, { Component } from 'react';
import { Redirect } from 'react-router';

import withCurrentUser from 'components/hocs/withCurrentUser';

function renderWithUnauthenticatedComponent(UnauthenticatedComponent, props) {
  if (props.currentUser.username) {
    return (
        <Redirect to='/' />
    );
  } else {
    return (
        <UnauthenticatedComponent {...props} />
    );
  }
}

function withUnauthenticated(UnauthenticatedComponent) {
  return withCurrentUser(class extends Component {
    render() {
      return renderWithUnauthenticatedComponent(UnauthenticatedComponent, this.props);
    }
  });
}

export default withUnauthenticated;
