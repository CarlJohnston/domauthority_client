import React, { Component } from 'react';
import PNotify from 'pnotify/dist/umd/PNotify';

import SiteRow from 'components/SiteRow/SiteRow';

import withAuthenticated from 'components/hocs/withAuthenticated';

import STATUS from 'configs/Status';
import ERROR from 'configs/Error';

class Sites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sites: [],
    };
  }

  componentDidMount() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var request = new Request('/users/current/sites', {
      headers: headers,
    });
    fetch(request)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.resolve(null);
        }
      })
      .then((sites) => {
        if (sites) {
          this.setState(() => {
            return {
              sites: sites,
            };
          });
        }
      })
      .catch((response) => {
        PNotify.alert({
          text: ERROR.unexpected,
          type: STATUS.error,
          delay: 2000,
        });
      });
  }

  render() {
    return (
      <div>
        Sites
        <table className='hover'>
          <thead>
            <tr>
              <th>Title</th>
              <th>URL</th>
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
