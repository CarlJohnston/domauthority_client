// @flow

import React, { Component } from 'react';

import type { Site as SiteType } from 'components/Sites/Site.type';
import type { onSiteRowRemove as onSiteRowRemoveType } from 'components/Sites/onSiteRowRemove.type';


type Props = {
  site: SiteType,
  onRemove: onSiteRowRemoveType,
};

class SiteRow extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td>{this.props.site.title}</td>
        <td>{this.props.site.url}</td>
        <td>
          <a
            id='remove'
            onClick={
              (e) => this.props.onRemove(
                e,
                {
                  title: this.props.site.title,
                  url: this.props.site.url,
                }
              )
            }
          >
            X
          </a>
        </td>
      </tr>
    );
  }
}

export default SiteRow;
