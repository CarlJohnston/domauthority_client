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
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    const {
      clearCurrentUser,
      history,
    } = this.props;

    clearCurrentUser();

    Token.clear();

    history.push('/');
  }

  render() {
    return (
      <a onClick={this.logout}>
        Logout
      </a>
    );
  }
}

export default withCurrentUser(LogoutLink);
