import React, { Component } from 'react';
import { Redirect } from 'react-router';

import withCurrentUser from 'components/hocs/withCurrentUser';

function renderProtectedComponent(ProtectedComponent, props) {
  if (props.currentUser.uid) {
    return (
      <ProtectedComponent {...props} />
    );
  } else {
    return (
      <Redirect to='/login' />
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
