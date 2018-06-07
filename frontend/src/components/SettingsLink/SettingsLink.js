import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SettingsLink extends Component {
  render() {
    return (
      <Link to='/settings'>
        Settings
      </Link>
    );
  }
}

export default SettingsLink;
