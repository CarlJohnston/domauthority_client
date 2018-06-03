import React, { Component } from 'react';

import CurrentUserContext from '../../contexts/User';

function withCurrentUser(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <CurrentUserContext.Consumer>
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
