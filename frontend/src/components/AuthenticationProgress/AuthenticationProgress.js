import React, { Component } from 'react';

import withCurrentUser from 'components/hocs/withCurrentUser';

class AuthenticationProgress extends Component {
  render() {
    return (
      <div>
      </div>
    );
  }
}

export default withCurrentUser(AuthenticationProgress);


