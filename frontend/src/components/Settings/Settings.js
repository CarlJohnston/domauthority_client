import React, { Component } from 'react';

import withAuthenticated from 'components/hocs/withAuthenticated';

class Settings extends Component {
  render() {
    return (
      <div>
        Settings
      </div>
    );
  }
}

export default withAuthenticated(Settings);

export { Settings as SettingsWithoutAuthenticated };
