import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import withCurrentUser from 'components/hocs/withCurrentUser';

class ProfileLink extends Component {
  render() {
    return (
      <Link to={`/users/${this.props.currentUser.username}`}>
        @{this.props.currentUser.username}
      </Link>
    );
  }
}

export default withCurrentUser(ProfileLink);
