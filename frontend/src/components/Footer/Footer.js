import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';

import withCurrentUser from 'components/hocs/withCurrentUser';

class Footer extends Component {
  render() {
    return (
      <div className='footer-container'>
        <div className='grid-container bottom-bar'>
          <div className='grid-x align-justify align-middle'>
            <div className='small-12 medium-shrink cell'>
              <ul className='menu'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/about'>About</Link></li>
                <li><Link to='/contact'>Contact</Link></li>
              </ul>
            </div>

            <div className='small-12 medium-shrink cell'>
              <span>Carl Johnston &copy; {(new Date().getFullYear())}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withCurrentUser(Footer);
