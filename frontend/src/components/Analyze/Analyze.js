// @flow

import React, { Component } from 'react';

import type { Site as SiteType } from 'components/Sites/Site.type';


type SitesData = Array<SiteType>;

type Props = {
  sites: SitesData,
};

class Analyze extends Component<Props> {
  render() {
    return (
      <div>
        <h1>
          Analyze
        </h1>
      </div>
    );
  }
}

export default Analyze;
