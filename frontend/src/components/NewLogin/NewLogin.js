// @flow

import React, { Component } from 'react';

import Login from 'components/Login/Login';

import type { CurrentUserContext as CurrentUserContextType } from 'contexts/CurrentUserContext.types';
import type { RouterHistory } from 'react-router-dom';


type Props = {
  history: RouterHistory,
  ...$Exact<CurrentUserContextType>,
};

class NewLogin extends Component<Props> {
  onAuthenticated: () => void;

  constructor(props: Props) {
    super(props);

    this.onAuthenticated = this.onAuthenticated.bind(this);
  }

  onAuthenticated() {
    this.props.history.push('/');
  }

  render() {
    return (
      <Login {...this.props} onAuthenticated={this.onAuthenticated} />
    );
  };
}

export default NewLogin;
