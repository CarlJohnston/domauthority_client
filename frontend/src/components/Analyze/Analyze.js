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

const DOMAIN_AUTHORITY_CONTAINER_ID = 'domain-authority-graph';
const PAGE_AUTHORITY_CONTAINER_ID = 'page-authority-graph';

class Analyze extends Component<Props> {
  siteGraph: SiteGraph;

  componentDidMount() {
    const {
      sites,
    } = this.props;

    this.domainAuthoritySiteGraph = new SiteGraph({
      selector: `#${DOMAIN_AUTHORITY_CONTAINER_ID}`,
      time: '%Y-%m-%dT%H:%M:%S.%LZ',
      property: 'domain_authority',
      xAxis: 'Domain Authority',
    });
    this.pageAuthoritySiteGraph = new SiteGraph({
      selector: `#${PAGE_AUTHORITY_CONTAINER_ID}`,
      time: '%Y-%m-%dT%H:%M:%S.%LZ',
      property: 'page_authority',
      xAxis: 'Page Authority',
    });

    this.domainAuthoritySiteGraph.update(sites);
    this.pageAuthoritySiteGraph.update(sites);
  }

  render() {
    const mozLogoSize = '75px';

    return (
      <div>
        <h1>
          Analyze
        </h1>
        <div id={DOMAIN_AUTHORITY_CONTAINER_ID}>
        </div>
        <div id={PAGE_AUTHORITY_CONTAINER_ID}>
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
