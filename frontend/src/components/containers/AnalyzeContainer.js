// @flow

import React, { Component } from 'react';
import { BeatLoader as Loader } from 'react-spinners';

import Fetcher from 'mixins/Fetcher';

import Analyze from 'components/Analyze/Analyze';

import type { Site as SiteType } from 'components/Sites/Site.type';


type SitesData = Array<SiteType>;

type Props = {};

type State = {
  loading: boolean,
  sites: SitesData,
};

class AnalyzeContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      loading: true,
      sites: [],
    };
  }

  componentDidMount() {
    Fetcher.Site.get({
      include: [
        'metrics',
      ],
    })
      .then((sites) => {
        this.setState(() => {
          return {
            loading: false,
            sites: sites,
          };
        });
      })
      .catch(() => {
        this.setState(() => {
          return {
            loading: false,
          };
        });
      });
  }

  render() {
    const {
      loading,
      sites,
    } = this.state;

    return (
      <React.Fragment>
        <Loader
          loading={loading}
        />
        {!loading &&
         (
           <Analyze
             sites={sites}
           />
         )
        }
      </React.Fragment>
    );
  }
}

export default AnalyzeContainer;
