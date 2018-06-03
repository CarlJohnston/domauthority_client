import React, { Component } from 'react';

import withCurrentUser from 'components/hocs/withCurrentUser';

class LogoutLink extends Component {
  logout() {
    this.props.clearCurrentUser();

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
