// @flow

import React, { Component } from 'react';
import $ from 'jquery';
import 'jquery.tipsy';

import withDocumentTitle from 'components/hocs/withDocumentTitle';

import SiteGraph from 'mixins/SiteGraph';

import type { Sites as SitesType } from 'components/Sites/Site.type';

import './Analyze.css';

window.$ = window.jQuery = $;


type Props = {
  sites: SitesType,
};

const DOMAIN_AUTHORITY_CONTAINER_ID = 'domain-authority-graph';
const PAGE_AUTHORITY_CONTAINER_ID = 'page-authority-graph';
const MOZ_RANK_CONTAINER_ID = 'moz-rank-graph';

class Analyze extends Component<Props> {
  domainAuthoritySiteGraph: SiteGraph;
  pageAuthoritySiteGraph: SiteGraph;
  mozRankSiteGraph: SiteGraph;

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
    this.mozRankSiteGraph = new SiteGraph({
      selector: `#${MOZ_RANK_CONTAINER_ID}`,
      time: '%Y-%m-%dT%H:%M:%S.%LZ',
      property: 'moz_rank',
      xAxis: 'Moz Rank',
    });

    this.domainAuthoritySiteGraph.update(sites);
    this.pageAuthoritySiteGraph.update(sites);
    this.mozRankSiteGraph.update(sites);
  }

  render() {
    const mozLogoSize = '75px';

    return (
      <div>
        <h1>
          Analyze
        </h1>
        <div className='grid-x'>
          <div className='cell large-10 large-offset-1'>
            <div id={DOMAIN_AUTHORITY_CONTAINER_ID}>
            </div>
          </div>
        </div>
        <div className='grid-x'>
          <div className='cell large-10 large-offset-1'>
            <div id={PAGE_AUTHORITY_CONTAINER_ID}>
            </div>
          </div>
        </div>
        <div className='grid-x'>
          <div className='cell large-10 large-offset-1'>
            <div id={MOZ_RANK_CONTAINER_ID}>
            </div>
          </div>
        </div>
        <div className='powered-by'>
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
