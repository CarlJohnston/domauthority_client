import React, { Component } from 'react';

import LoginPopUpContext from 'contexts/LoginPopUpContext';

function withLoginPopUp(WrappedComponent) {
  return class extends Component {
    render() {
      return (
        <LoginPopUpContext.Consumer>
          {({setLoginPopUp}) => (
            <WrappedComponent
              {...this.props}
              setLoginPopUp={setLoginPopUp}
            />
          )}
        </LoginPopUpContext.Consumer>
      );
    }
  };
}

export default withLoginPopUp;
