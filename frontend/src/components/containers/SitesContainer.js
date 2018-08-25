// @flow

import React, { Component } from 'react';
import PNotify from 'pnotify/dist/umd/PNotify';
import { BeatLoader as Loader } from 'react-spinners';

import Sites from 'components/Sites/Sites';

import STATUS from 'configs/Status';
import ERROR from 'configs/Error';

import type { Site as SiteType } from 'components/Sites/Site.type';
import type { onSiteRemove as onSiteRemoveType } from 'components/Sites/onSiteRemove.type';
import type { onSiteUpdate as onSiteUpdateType } from 'components/Sites/onSiteUpdate.type';
import type { onSiteCreate as onSiteCreateType } from 'components/Sites/onSiteCreate.type';
import type { Notification } from 'notifications/Notification.type';


type SitesData = Array<SiteType>;

type State = {
  loading: boolean,
  sites: SitesData,
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
    const request: Request = new Request('/users/current/sites');
    let notification: ?Notification;
    fetch(request)
      .then((response: Response) => {
        if (response.ok) {
          return response.json();
        } else {
          // TODO resolve past next handler
          // TODO change error message
          const status = STATUS.error;
          notification = {
            title: status,
            text: ERROR.unexpected,
            type: status,
          };

          return Promise.resolve(null);
        }
      })
      .then((sites: ?SitesData) => {
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
        }, () => {
          const status = STATUS.error;
          notification = {
            title: status,
            text: ERROR.unexpected,
            type: status,
          };
        });
      })
      .finally(() => {
        if (notification) {
          PNotify.alert(notification);
        }
      });
  }

  onSiteRemove: onSiteRemoveType = (site: SiteType) => {
    const request: Request = new Request(`/users/current/sites/${site.id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    });
    let notification: ?Notification;
    fetch(request)
      .then((response: Response) => {
        if (response.ok) {
          this.setState((prevState) => {
            const sitesFiltered = prevState.sites.filter(({ title, url }) => {
              return title !== site.title || url !== site.url;
            });

            // TODO wrapper for general case?
            const status = STATUS.success;
            notification = {
              title: status,
              text: 'Site successfully removed!',
              type: status,
            };

            return {
              sites: sitesFiltered,
            };
          });
        } else {
          // TODO change error type
          const status = STATUS.error;
          notification = {
            title: status,
            text: ERROR.unexpected,
            type: status,
          };
        }
      })
      .catch(() => {
        // TODO wrapper on this for general case?
        const status = STATUS.error;
        notification = {
          title: status,
          text: ERROR.unexpected,
          type: status,
        };
      })
      .finally(() => {
        if (notification) {
          PNotify.alert(notification);
        }
      });
  }

  onSiteUpdate: onSiteUpdateType = (site: SiteType) => {
    const request: Request = new Request(`/users/current/sites/${site.id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({
        site: site,
      }),
    });
    let notification: ?Notification;
    fetch(request)
      .then((response: Response) => {
        if (response.ok) {
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

            // TODO wrapper for general case?
            const status = STATUS.success;
            notification = {
              title: status,
              text: 'Site successfully updated!',
              type: status,
            };

            return {
              sites: sitesUpdated,
            };
          });
        } else {
          // TODO change error type
          const status = STATUS.error;
          notification = {
            title: status,
            text: ERROR.unexpected,
            type: status,
          };
        }
      })
      .catch(() => {
        // TODO wrapper on this for general case?
        const status = STATUS.error;
        notification = {
          title: status,
          text: ERROR.unexpected,
          type: status,
        };
      })
      .finally(() => {
        if (notification) {
          PNotify.alert(notification);
        }
      });
  }

  onSiteCreate: onSiteCreateType = (site: SiteType, callback: () => void) => {
    const request: Request = new Request('/users/current/sites', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        site: site,
      }),
    });
    let notification: ?Notification;
    fetch(request)
      .then((response: Response) => {
        if (response.ok) {
          return response.json();
        } else {
          // TODO change error type
          const status = STATUS.error;
          notification = {
            title: status,
            text: ERROR.conflict, // TODO convert from response based on code from backend
            type: status,
          };

          return Promise.resolve(null);
        }
      })
      .then((newSite: ?SiteType) => {
        if (newSite) {
          this.setState((prevState) => {
            const sitesUpdated = [...prevState.sites];
            sitesUpdated.push(newSite);

            return {
              sites: sitesUpdated,
            };
          });

          // TODO wrapper for general case?
          const status = STATUS.success;
          notification = {
            title: status,
            text: 'Site successfully added!',
            type: status,
          };
        }
      })
      .catch(() => {
        // TODO wrapper on this for general case?
        const status = STATUS.error;
        notification = {
          title: status,
          text: ERROR.unexpected,
          type: status,
        };
      })
      .finally(() => {
        callback();

        if (notification) {
          PNotify.alert(notification);
        }
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
