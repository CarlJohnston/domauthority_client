// @flow

import React, { Component } from 'react';

import CurrentUserContext from 'contexts/CurrentUserContext';

import type { ComponentType } from 'react';


function withCurrentUser(WrappedComponent: ComponentType<any>) {
  return class extends Component<{}> {
    render() {
      return (
        <CurrentUserContext.Consumer>
          {
            ({ currentUser, setCurrentUser, clearCurrentUser }) => {
              return (
                <WrappedComponent
                  {...this.props}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  clearCurrentUser={clearCurrentUser}
                />
              );
            }
          }
        </CurrentUserContext.Consumer>
      );
    }
  };
}

export default withCurrentUser;
