import React, { Component } from 'react';

import LoginPopUpContext from 'contexts/LoginPopUpContext';

function withLoginPopUp(WrappedComponent) {
  return class extends Component {
    render() {
      return (
        <LoginPopUpContext.Consumer>
          {({loginPopUp, setLoginPopUp}) => (
            <WrappedComponent
              {...this.props}
              loginPopUp={loginPopUp}
              setLoginPopUp={setLoginPopUp}
            />
          )}
        </LoginPopUpContext.Consumer>
      );
    }
  };
}

export default withLoginPopUp;
