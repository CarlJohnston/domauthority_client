import React, { Component } from 'react';

import withCurrentUser from 'components/hocs/withCurrentUser';

import Token from 'helpers/Token';

class LogoutLink extends Component {
  logout() {
    this.props.clearCurrentUser();

    Token.clear();

    this.props.history.push('/');
  }

  render() {
    return (
      <a onClick={this.logout.bind(this)}>
        Logout
      </a>
    );
  }
}

export default withCurrentUser(LogoutLink);
