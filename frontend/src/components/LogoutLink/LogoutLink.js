// @flow

import React, { Component } from 'react';

import withCurrentUser from 'components/hocs/withCurrentUser';

import Token from 'helpers/Token';

import type { CurrentUserContext as CurrentUserContextType } from 'contexts/CurrentUserContext.types';
import type { RouterHistory } from 'react-router-dom';

type Props = {
  history: RouterHistory,
  ...$Exact<CurrentUserContextType>,
};

class LogoutLink extends Component<Props> {
  logout() {
    this.props.clearCurrentUser();

    Token.clear();

    this.props.history.push('/');
  }

  render() {
    return (
      <a onClick={this.logout.bind(this)}>
        Logout
      </a>
    );
  }
}

export default withCurrentUser(LogoutLink);
