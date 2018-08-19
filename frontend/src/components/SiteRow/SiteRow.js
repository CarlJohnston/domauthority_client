// @flow

import React, { Component } from 'react';

import type { Site as SiteType } from 'components/Sites/Site.type';
import type { onSiteRemove as onSiteRemoveType } from 'components/Sites/onSiteRemove.type';


type Props = {
  site: SiteType,
  onRemove: onSiteRemoveType,
};

class SiteRow extends Component<Props> {
  render() {
    const {
      site,
      onRemove,
    } = this.props;

    return (
      <tr>
        <td>
          {site.title}
        </td>
        <td>
          {site.url}
        </td>
        <td>
          <button
            type='button'
            id='remove'
            onClick={
              (e: Event) => {
                onRemove(
                  e,
                  {
                    title: site.title,
                    url: site.url,
                  }
                )
              }
            }
          >
            X
          </button>
        </td>
      </tr>
    );
  }
}

export default SiteRow;
