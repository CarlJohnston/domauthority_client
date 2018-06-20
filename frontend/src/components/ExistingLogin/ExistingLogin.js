import React, { Component } from 'react';

import { LoginWithoutUnauthenticated as Login } from 'components/Login/Login';

class ExistingLogin extends Component {
  render() {
    return (
      <Login {...this.props} />
    );
  };
}

export default ExistingLogin;
