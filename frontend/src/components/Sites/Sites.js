import React, { Component } from 'react';
import PNotify from 'pnotify/dist/umd/PNotify';

import SiteRow from 'components/SiteRow/SiteRow';

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
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let request = new Request('/users/current/sites', {
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
              this.state.sites.map((site, index) => {
                return (
                  <SiteRow key={index} site={site} />
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default Sites;
