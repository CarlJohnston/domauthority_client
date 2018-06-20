import React, { Component } from 'react';

import { LoginWithoutUnauthenticated as Login } from 'components/Login/Login';

import withLoginPopUp from 'components/hocs/withLoginPopUp';

class ExistingLogin extends Component {
  constructor(props) {
    super(props);

    this.onAuthenticated = this.onAuthenticated.bind(this);
  }

  onAuthenticated() {
    this.props.setLoginPopUp(false);
  }

  render() {
    return (
      <Login {...this.props} onAuthenticated={this.onAuthenticated} />
    );
  };
}

export default withLoginPopUp(ExistingLogin);
