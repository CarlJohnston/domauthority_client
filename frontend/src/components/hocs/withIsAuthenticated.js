import React, { Component } from 'react';

import IsAuthenticatedContext from 'contexts/IsAuthenticatedContext';

function withIsAuthenticated(WrappedComponent) {
  return class extends Component {
    render() {
      return (
        <IsAuthenticatedContext.Consumer>
          {({isAuthenticated}) => (
            <WrappedComponent
              {...this.props}
              isAuthenticated={isAuthenticated}
            />
          )}
        </IsAuthenticatedContext.Consumer>
      );
    }
  };
}

export default withIsAuthenticated;
