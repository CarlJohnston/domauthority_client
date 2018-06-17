import React, { Component } from 'react';

import withCurrentUser from 'components/hocs/withCurrentUser';

import AuthenticationToken from 'helpers/AuthenticationToken';

class LogoutLink extends Component {
  logout() {
    this.props.clearCurrentUser();

    AuthenticationToken.clear();

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
