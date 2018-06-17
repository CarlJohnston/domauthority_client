import React, { Component } from 'react';
import { Redirect } from 'react-router';

import IsAuthenticatedContext from 'contexts/IsAuthenticatedContext';

import withCurrentUser from 'components/hocs/withCurrentUser';

function renderAuthenticatedComponent(AuthenticatedComponent, props, state) {
  if (props.currentUser.username) {
    return (
      <IsAuthenticatedContext.Provider value={state.isAuthenticated}>
        <AuthenticatedComponent {...props} />
      </IsAuthenticatedContext.Provider>
    );
  } else {
    return (
      <Redirect to='/login' />
    );
  }
}

function withAuthenticated(AuthenticatedComponent) {
  return withCurrentUser(class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        isAuthenticated: {
          setIsAuthenticated: function (bool) {
          }.bind(this),
        },
      };
    }

    render() {
      return renderAuthenticatedComponent(AuthenticatedComponent, this.props, this.state);
    }
  });
}

export default withAuthenticated;
