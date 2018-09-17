// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';

import withCurrentUser from 'components/hocs/withCurrentUser';

import APPLICATION from 'configs/Application';


type Props = {
};

class Footer extends Component<Props> {
  render() {
    const contactEmail = `info@${APPLICATION.title}.com`;

    return (
      <div className='footer-container'>
        <div className='grid-container bottom-bar'>
          <div className='grid-x align-justify align-middle'>
            <div className='small-12 medium-shrink cell'>
              <ul className='menu'>
                <li>
                  <a href={`mailto:${contactEmail}`}>
                    {contactEmail}
                  </a>
                </li>
              </ul>
            </div>

            <div className='small-12 medium-shrink cell'>
              <span>
                Carl Johnston &copy; {(new Date().getFullYear())}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withCurrentUser(Footer);
