import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

class Layout extends Component {
  render() {
    return (
      <div>
        <div className="grid-container">
          <div className="top-bar">
            <div className="top-bar-left">
              <ul className="dropdown menu" data-dropdown-menu>
                <li className="menu-text">Simplicify</li>
                <li><Link to='/topics'>Topics</Link></li>
              </ul>
            </div>
            <div className="top-bar-right">
              <ul className="menu">
                <li><input type="search" placeholder="Search" /></li>
                <li><button type="button" className="button">Search</button></li>
              </ul>
            </div>
          </div>
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
