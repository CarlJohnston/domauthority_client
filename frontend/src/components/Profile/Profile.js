import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import withCurrentUser from '../hocs/withCurrentUser';

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
