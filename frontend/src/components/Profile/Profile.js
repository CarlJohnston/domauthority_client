import React, { Component } from 'react';

import withCurrentUser from 'components/hocs/withCurrentUser';

class Profile extends Component {
  render() {
    return (
      <div>
        <h1>@{this.props.currentUser.username}</h1>
      </div>
    );
  }
}

export default withCurrentUser(Profile);
