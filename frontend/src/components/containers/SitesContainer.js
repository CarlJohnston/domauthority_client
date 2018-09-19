// @flow

import React, { Component } from 'react';
import { BeatLoader as Loader } from 'react-spinners';

import Sites from 'components/Sites/Sites';

import Fetcher from 'mixins/Fetcher';

import type { Site as SiteType } from 'components/Sites/Site.type';
import type { onSiteRemove as onSiteRemoveType } from 'components/Sites/onSiteRemove.type';
import type { onSiteUpdate as onSiteUpdateType } from 'components/Sites/onSiteUpdate.type';
import type { onSiteCreate as onSiteCreateType } from 'components/Sites/onSiteCreate.type';


type State = {
  loading: boolean,
  sites: SitesType,
};

type Props = {
};

class SitesContainer extends Component<Props, State> {
  onSiteRemove: onSiteRemoveType;
  onSiteUpdate: onSiteUpdateType;
  onSiteCreate: onSiteCreateType;

  constructor(props: Props) {
    super(props);

    this.state = {
      loading: true,
      sites: [],
    };

    this.onSiteRemove = this.onSiteRemove.bind(this);
    this.onSiteUpdate = this.onSiteUpdate.bind(this);
    this.onSiteCreate = this.onSiteCreate.bind(this);
  }

  componentDidMount() {
    Fetcher.Site.get()
      .then((sites: ?SitesType) => {
        this.setState(() => {
          return {
            loading: false,
            sites: sites || [],
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

  onSiteRemove: onSiteRemoveType = (site: SiteType) => {
    Fetcher.Site.delete(site)
      .then(() => {
        this.setState((prevState) => {
          const sitesFiltered = prevState.sites.filter(({ title, url }) => {
            return title !== site.title || url !== site.url;
          });

          return {
            sites: sitesFiltered,
          };
        });
      });
  }

  onSiteUpdate: onSiteUpdateType = (site: SiteType) => {
    Fetcher.Site.update(site)
      .then(() => {
        this.setState((prevState) => {
          const prevSites = [...prevState.sites];
          const prevSitesSiteIndex = prevSites.findIndex((prevSite) => {
            return site.url === prevSite.url;
          });

          let sitesUpdated;
          if (prevSitesSiteIndex === -1) {
            sitesUpdated = prevSites;
          } else {
            sitesUpdated = [...prevSites];
            sitesUpdated.splice(prevSitesSiteIndex, 1, site);
          }

          return {
            sites: sitesUpdated,
          };
        });
      });
  }

  onSiteCreate: onSiteCreateType = (site: SiteType, callback: () => void) => {
    Fetcher.Site.create(site)
      .then((newSite) => {
        if (newSite) {
          this.setState((prevState) => {
            const sitesUpdated = [...prevState.sites];
            sitesUpdated.push(newSite);

            return {
              sites: sitesUpdated,
            };
          });
        }
      })
      .finally(() => {
        callback();
      });
  }

  render() {
    const {
      sites,
      loading,
    } = this.state;

    return (
      <React.Fragment>
        <Loader
          loading={loading}
        />
        {!loading &&
          (
            <Sites
              sites={sites}
              onSiteRemove={this.onSiteRemove}
              onSiteUpdate={this.onSiteUpdate}
              onSiteCreate={this.onSiteCreate}
            />
          )
        }
      </React.Fragment>
    );
  }
}

export default SitesContainer;
