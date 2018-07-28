// @flow

import React, { Component } from 'react';
import PNotify from 'pnotify/dist/umd/PNotify';
import { BeatLoader as Loader } from 'react-spinners';

import SiteRow from 'components/SiteRow/SiteRow';

import STATUS from 'configs/Status';
import ERROR from 'configs/Error';


type SitesData = Array<{
  title: string,
  url: string,
}>;

type State = {
  loading: boolean,
  sites: SitesData,
};

type Props = {
};

class Sites extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      loading: true,
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
      .then((sites: ?SitesData) => {
        this.setState((prevState) => {
          return {
            loading: false,
            sites: sites || prevState.sites,
          };
        });
      })
      .catch((response) => {
        this.setState(() => {
          return {
            loading: false,
          };
        }, () => {
          PNotify.alert({
            text: ERROR.unexpected,
            type: STATUS.error,
            delay: 2000,
          });
        });
      });
  }

  render() {
    return (
      <React.Fragment>
        <Loader
          loading={this.state.loading}
        />
        {!this.state.loading &&
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
        }
      </React.Fragment>
    );
  }
}

export default Sites;
