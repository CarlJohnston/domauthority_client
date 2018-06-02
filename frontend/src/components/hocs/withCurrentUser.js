import React, { Component } from 'react';

import CurrentUser from '../../contexts/User';

function withCurrentUser(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <CurrentUser.Consumer>
          {({currentUser, setCurrentUser, clearCurrentUser}) => (
            <WrappedComponent
              {...this.props}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              clearCurrentUser={clearCurrentUser}
            />
          )}
        </CurrentUser.Consumer>
      );
    }
  };
}

export default withCurrentUser;
