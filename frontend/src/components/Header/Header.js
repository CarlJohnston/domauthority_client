import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import withCurrentUser from 'components/hocs/withCurrentUser';

class Header extends Component {
  logout() {
    this.props.clearCurrentUser();

    this.props.history.push('/');
  }

  render() {
    return (
      <div className="grid-container">
        <div className="top-bar">
          <div className="top-bar-left">
            <ul className="dropdown menu" data-dropdown-menu>
              <li><Link to='/'>Simplicify</Link></li>
              <li><Link to='/topics'>Topics</Link></li>
            </ul>
          </div>
          <div className="top-bar-right">
            <ul className="menu">
              <li><input type="search" placeholder="Search" /></li>
              <li><button type="button" className="button">Search</button></li>

              {this.props.currentUser.uid &&
               <li><Link to={`/users/${this.props.currentUser.username}`}>@{this.props.currentUser.username}</Link></li>
              }
              {this.props.currentUser.uid &&
               <li><a onClick={this.logout.bind(this)}>Logout</a></li>
              }

              {!this.props.currentUser.uid &&
               <li><Link to='/login'>Login</Link></li>
              }
              {!this.props.currentUser.uid &&
               <li><Link to='/register'>Register</Link></li>
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default withCurrentUser(Header);
