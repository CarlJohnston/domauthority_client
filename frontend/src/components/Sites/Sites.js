// @flow

import React, { Component } from 'react';
import PNotify from 'pnotify/dist/umd/PNotify';
import { BeatLoader as Loader } from 'react-spinners';

import SiteRow from 'components/SiteRow/SiteRow';

import STATUS from 'configs/Status';
import ERROR from 'configs/Error';

import type { Site as SiteType } from 'components/Sites/Site.type';
import type { onSiteRowRemove as onSiteRowRemoveType } from 'components/Sites/onSiteRowRemove.type';


type SitesData = Array<SiteType>;

type Props = {
  sites: SitesData,
  onSiteRowRemove: onSiteRowRemoveType,
};

class Sites extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    let {
      sites,
      onSiteRowRemove,
    } = this.props;

    return (
      <div id='sites'>
        Sites
        <table className='hover'>
          <thead>
            <tr>
              <th>
                Title
              </th>
              <th>
                URL
              </th>
              <th />
            </tr>
          </thead>
          <tbody>
            {
              sites.map((site) => {
                return (
                  <SiteRow
                    key={site.url}
                    site={site}
                    onRemove={onSiteRowRemove}
                  />
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
