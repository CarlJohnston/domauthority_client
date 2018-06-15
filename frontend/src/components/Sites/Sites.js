import React, { Component } from 'react';

import withAuthenticated from 'components/hocs/withAuthenticated';

class Sites extends Component {
  render() {
    return (
      <div>
        Sites
      </div>
    );
  }
}

export default withAuthenticated(Sites);
