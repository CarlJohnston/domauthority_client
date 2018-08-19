// @flow

import React, { PureComponent } from 'react';

import SiteRow from 'components/SiteRow/SiteRow';

import type { Site as SiteType } from 'components/Sites/Site.type';
import type { onSiteRemove as onSiteRemoveType } from 'components/Sites/onSiteRemove.type';


type SitesData = Array<SiteType>;

type Props = {
  sites: SitesData,
  onSiteRemove: onSiteRemoveType,
};

class Sites extends PureComponent<Props> {
  render() {
    const {
      sites,
      onSiteRemove,
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
                    onRemove={onSiteRemove}
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
