import React, { Component } from 'react';

import IsAuthenticatedContext from 'contexts/IsAuthenticatedContext';

function withIsAuthenticated(WrappedComponent) {
  return class extends Component {
    render() {
      return (
        <IsAuthenticatedContext.Consumer>
          {({setIsAuthenticated}) => (
            <WrappedComponent
              {...this.props}
              setIsAuthenticated={setIsAuthenticated}
            />
          )}
        </IsAuthenticatedContext.Consumer>
      );
    }
  };
}

export default withIsAuthenticated;
