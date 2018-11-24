// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';


type Props = {
};

class SettingsLink extends Component<Props> {
  render() {
    return (
      <Link to='/settings'>
        Settings
      </Link>
    );
  }
}

export default SettingsLink;
