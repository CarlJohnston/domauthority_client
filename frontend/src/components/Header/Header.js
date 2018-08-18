// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

import ProfileLink from 'components/ProfileLink/ProfileLink';
import LogoutLink from 'components/LogoutLink/LogoutLink';
import LoginLink from 'components/LoginLink/LoginLink';
import RegisterLink from 'components/RegisterLink/RegisterLink';
import SettingsLink from 'components/SettingsLink/SettingsLink';

import withCurrentUser from 'components/hocs/withCurrentUser';

import type { CurrentUserContext as CurrentUserContextType } from 'contexts/CurrentUserContext.types';


type Props = {
  ...$Exact<CurrentUserContextType>,
};

class Header extends Component<Props> {
  render() {
    const {
      currentUser,
    } = this.props;

    return (
      <div className='top-bar-container'>
        <div className='grid-container'>
          <div className='top-bar'>
            <div className='top-bar-left'>
              <ul className='dropdown menu' data-dropdown-menu>
                <li className='logo'>
                  <Link to='/'>
                    Domauthority
                  </Link>
                </li>
                <li>
                  <Link to='/sites'>
                    Sites
                  </Link>
                </li>
                <li>
                  <Link to='/analyze'>
                    Analyze
                  </Link>
                </li>
              </ul>
            </div>
            <div className='top-bar-right'>
              <ul className='menu'>
                {currentUser.username ? (
                  <React.Fragment>
                    <li>
                      <ProfileLink />
                    </li>
                    <li>
                      <SettingsLink />
                    </li>
                    <li>
                      <LogoutLink {...this.props} />
                    </li>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <li>
                      <LoginLink />
                    </li>
                    <li>
                      <RegisterLink />
                    </li>
                  </React.Fragment>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withCurrentUser(Header);
