import React, { Component } from 'react';

import withAuthenticated from 'components/hocs/withAuthenticated';

class Analyze extends Component {
  render() {
    return (
        <div>
        Analyze
      </div>
    );
  }
}

export default withAuthenticated(Analyze);
