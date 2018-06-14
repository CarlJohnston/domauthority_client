import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

import ProfileLink from 'components/ProfileLink/ProfileLink';
import LogoutLink from 'components/LogoutLink/LogoutLink';
import LoginLink from 'components/LoginLink/LoginLink';
import RegisterLink from 'components/RegisterLink/RegisterLink';
import SettingsLink from 'components/SettingsLink/SettingsLink';

import withCurrentUser from 'components/hocs/withCurrentUser';

class Header extends Component {
  render() {
    return (
      <div class="top-bar-container">
        <div className="grid-container">
          <div className="top-bar">
            <div className="top-bar-left">
              <ul className="dropdown menu" data-dropdown-menu>
                <li><Link to='/'>Domauthority</Link></li>
                <li><Link to='/topics'>Topics</Link></li>
              </ul>
            </div>
            <div className="top-bar-right">
              <ul className="menu">
                <li><input type="search" placeholder="Search" /></li>
                <li><button type="button" className="button">Search</button></li>

                {this.props.currentUser.uid &&
                 <li>
                   <ProfileLink />
                 </li>
                }
                {this.props.currentUser.uid &&
                 <li>
                   <SettingsLink />
                 </li>
                }
                {this.props.currentUser.uid &&
                 <li>
                   <LogoutLink {...this.props} />
                 </li>
                }

                {!this.props.currentUser.uid &&
                 <li>
                   <LoginLink />
                 </li>
                }
                {!this.props.currentUser.uid &&
                 <li>
                   <RegisterLink />
                 </li>
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withCurrentUser(Header);
