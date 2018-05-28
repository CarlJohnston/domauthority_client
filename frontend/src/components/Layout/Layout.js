import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

class Layout extends Component {
  render() {
    return (
      <div>
        <div class="grid-container">
          <div class="top-bar">
            <div class="top-bar-left">
              <ul class="dropdown menu" data-dropdown-menu>
                <li class="menu-text">Simplicify</li>
                <li><a href="#">One</a></li>
                <li><a href="#">Two</a></li>
                <li><a href="#">Three</a></li>
              </ul>
            </div>
            <div class="top-bar-right">
              <ul class="menu">
                <li><input type="search" placeholder="Search" /></li>
                <li><button type="button" class="button">Search</button></li>
              </ul>
            </div>
          </div>
        </div>

        <div class="grid-container">
          <div class="grid-x align-justify align-middle">
            <div class="small-12 medium-shrink cell">
              <ul class="menu">
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>

            <div class="small-12 medium-shrink cell">
              <span>Copyright 2018</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
