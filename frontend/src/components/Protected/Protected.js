import React, { Component } from 'react';

import AuthenticationProgress from 'components/AuthenticationProgress/AuthenticationProgress';

import withCurrentUser from 'components/hocs/withCurrentUser';

function renderWrappedComponent(WrappedComponent, props) {
  if (props.isAuthenticated) {
    return (
      <WrappedComponent {...props} />
    );
  } else {
    return (
      <AuthenticationProgress />
    );
  }
}

function Protected(WrappedComponent) {
  return withCurrentUser(class extends Component {
    render() {
      return renderWrappedComponent(WrappedComponent, this.props);
    }
  });
}

export default Protected;
