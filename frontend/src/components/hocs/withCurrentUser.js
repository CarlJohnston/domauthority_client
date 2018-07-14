// @flow

import React, { Component } from 'react';

import CurrentUserContext from 'contexts/CurrentUserContext';

import type { ComponentType } from 'react';


type Props = {
};

function withCurrentUser(WrappedComponent: ComponentType<any>) {
  return class extends Component<Props> {
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
