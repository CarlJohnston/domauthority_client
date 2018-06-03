import React, { Component } from 'react';

import CurrentUserContext from 'contexts/CurrentUserContext';

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
        </CurrentUserContext.Consumer>
      );
    }
  };
}

export default withCurrentUser;
