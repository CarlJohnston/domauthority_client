import React, { Component } from 'react';

import SiteRow from 'components/SiteRow/SiteRow';

import Fetch from 'helpers/Fetch';
import AuthenticationToken from 'helpers/AuthenticationToken';

import withAuthenticated from 'components/hocs/withAuthenticated';

class Sites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sites: [],
    };
  }

  componentDidMount() {
    var token = AuthenticationToken.get();
    var request = new Request('/users/current/sites', {
      'Content-Type': 'application/json',
    });

    Fetch(request)
      .then((response) => {
      })
      .catch((response) => {
      });
  }

  render() {
    return (
      <div>
        Sites
        <table className='hover'>
          <thead>
            <tr>
              <th>Favicon</th>
              <th>Title</th>
              <th>URL</th>
              <th>DA</th>
              <th>PA</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.sites.map((site) => {
                return (
                  <SiteRow site={site} />
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default withAuthenticated(Sites);
