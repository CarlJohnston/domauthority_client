// @flow

import React, { Component } from 'react';
import $ from 'jquery';
import 'jquery.tipsy';

import SiteGraph from 'mixins/SiteGraph';

import type { Site as SiteType } from 'components/Sites/Site.type';

window.$ = window.jQuery = $;


type SitesData = Array<SiteType>;

type Props = {
  sites: SitesData,
};

const CONTAINER_ID = 'd3-graph';

class Analyze extends Component<Props> {
  siteGraph: SiteGraph;

  componentDidMount() {
    const {
      sites,
    } = this.props;

    this.siteGraph = new SiteGraph(CONTAINER_ID, {
      time: '%Y-%m-%dT%H:%M:%S.%LZ',
    });

    this.siteGraph.update(sites);
  }

  render() {
    return (
      <div>
        <h1>
          Analyze
        </h1>
        <div id='d3-graph'>
        </div>
      </div>
    );
  }
}

export default Analyze;
