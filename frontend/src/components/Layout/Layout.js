import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import Login from '../Login/Login';
import Register from '../Register/Register';
import Forgot from '../Forgot/Forgot';
import Home from '../Home/Home';

class Layout extends Component {
  render() {
    return (
      <div>
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

                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/register'>Register</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid-container">
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/password/forgot' component={Forgot} />
        </div>

        <div className="grid-container">
          <div className="grid-x align-justify align-middle">
            <div className="small-12 medium-shrink cell">
              <ul className="menu">
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/about'>About</Link></li>
                <li><Link to='/contact'>Contact</Link></li>
              </ul>
            </div>

            <div className="small-12 medium-shrink cell">
              <span>Copyright {(new Date().getFullYear())}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
