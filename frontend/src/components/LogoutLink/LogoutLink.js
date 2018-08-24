// @flow

import React, { Component } from 'react';
import PNotify from 'pnotify/dist/umd/PNotify';

import withCurrentUser from 'components/hocs/withCurrentUser';

import Token from 'helpers/Token';

import STATUS from 'configs/Status';

import type { CurrentUserContext as CurrentUserContextType } from 'contexts/CurrentUserContext.types';
import type { RouterHistory } from 'react-router-dom';

type Props = {
  history: RouterHistory,
  ...$Exact<CurrentUserContextType>,
};

class LogoutLink extends Component<Props> {
  logout: () => void;

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

    PNotify.alert({
      text: 'Logged out successfully!',
      type: STATUS.success,
      delay: 2000,
    });
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
