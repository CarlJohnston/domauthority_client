import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';

import withCurrentUser from 'components/hocs/withCurrentUser';

class NotAuthenticatedRoute extends Component {
  render() {
    let { component: Component, currentUser, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={
          (props) => {
            if (!currentUser.username) {
              return (
                <Component {...props} />
              );
            } else {
              return (
                <Redirect to='/login' />
              );
            }
          }
        }
      />
    );
  }
};

export default withCurrentUser(NotAuthenticatedRoute);
