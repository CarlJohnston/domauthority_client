import React, { Component } from 'react';

import withCurrentUser from 'components/hocs/withCurrentUser';

class Protected extends Component {
  constructor(props) {
    super(props);

    if (!this.props.currentUser.uid) {
      this.props.history.push('/login');
    }
  }
}

export default withCurrentUser(Protected);
