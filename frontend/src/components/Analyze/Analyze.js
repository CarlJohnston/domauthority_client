// @flow

import React, { Component } from 'react';
import $ from 'jquery';
import 'jquery.tipsy';

import withDocumentTitle from 'components/hocs/withDocumentTitle';

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
    const mozLogoSize = '75px';

    return (
      <div>
        <h1>
          Analyze
        </h1>
        <div id='d3-graph'>
        </div>
        <div>
          <span>
            Powered by
          </span>
          <a
            href='https://moz.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='moz.svg'
              width={mozLogoSize}
              height={mozLogoSize}
              alt='Moz, Inc.'
            />
          </a>
        </div>
      </div>
    );
  }
}

export default withDocumentTitle(Analyze, 'Analyze');
