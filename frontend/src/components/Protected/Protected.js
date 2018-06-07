import React, { Component } from 'react';

import withCurrentUser from 'components/hocs/withCurrentUser';

class Protected extends Component {
  constructor(props) {
    super(props);

    // TODO token validation
    // if localStorage token
    //   check token via AJAX
    //   if token valid
    //     set new localStorage token
    //     continue
    //   else
    //     remove localStorage token
    //     if history > 1
    //       display popup
    //     else
    //       redirect to login
    // else
    //    if history > 1
    //        display popup
    //    else
    //        redirect to login
    if (!this.props.currentUser.uid) {
      this.props.history.push('/login');
    }
  }
}

export default withCurrentUser(Protected);
