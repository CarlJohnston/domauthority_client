import React, { Component } from 'react';

import AuthenticationProgress from 'components/AuthenticationProgress/AuthenticationProgress';

import withCurrentUser from 'components/hocs/withCurrentUser';

function Protected(WrappedComponent) {
  return withCurrentUser(class extends Component {
    render() {
      return (
        <div>
          {!this.props.isAuthenticated &&
           <AuthenticationProgress />
          }
          {this.props.isAuthenticated &&
           <WrappedComponent {...this.props} />
          }
        </div>
      );
    }
  });
}

export default Protected;
