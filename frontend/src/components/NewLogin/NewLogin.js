import React, { Component } from 'react';

import Login from 'components/Login/Login';

class NewLogin extends Component {
  constructor(props) {
    super(props);

    this.onAuthenticated = this.onAuthenticated.bind(this);
  }

  onAuthenticated() {
    this.props.history.push('/');
  }

  render() {
    return (
      <Login {...this.props} onAuthenticated={this.onAuthenticated} />
    );
  };
}

export default NewLogin;
