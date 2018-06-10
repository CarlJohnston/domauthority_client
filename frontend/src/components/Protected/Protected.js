import React, { Component } from 'react';

import withCurrentUser from 'components/hocs/withCurrentUser';

function Protected(WrappedComponent) {
  return withCurrentUser(class extends Component {
    constructor(props) {
      super(props);

      if (!this.props.currentUser.uid) {
        this.props.history.push('/login');
      }
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }
  });
}

export default Protected;
