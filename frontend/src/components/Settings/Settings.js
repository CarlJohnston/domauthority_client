import React, { Component } from 'react';

import Protected from 'components/Protected/Protected';

class Settings extends Component {
  render() {
    return (
      <div>
        Settings
      </div>
    );
  }
}

export default Protected(Settings);

export { Settings as SettingsUnprotected };
