import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import CurrentUser from '../../contexts/User';

class Profile extends Component {
  render() {
    return (
      <CurrentUser.Consumer>
        {currentUser => (
          <div>
            <h1>@{currentUser.username}</h1>
          </div>
        )}
      </CurrentUser.Consumer>
    );
  }
}

export default Profile;
