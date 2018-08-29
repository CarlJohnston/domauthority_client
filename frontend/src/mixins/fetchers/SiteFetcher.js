// @flow

import PNotify from 'pnotify/dist/umd/PNotify';

import STATUS from 'configs/Status';
import ERROR from 'configs/Error';

import type { Site as SiteType } from 'components/Sites/Site.type';
import type { Notification } from 'notifications/Notification.type';


class SiteFetcher {
  static create(site: SiteType): void {
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
    return fetch(request)
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
        // TODO wrapper for general case?
        const status = STATUS.success;
        notification = {
          title: status,
          text: 'Site successfully added!',
          type: status,
        };

        return newSite;
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

  static get(): void {
    const request: Request = new Request('/users/current/sites', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let notification: ?Notification;
    return fetch(request)
      .then((response: Response) => {
        if (response.ok) {
          return response.json();
        } else {
          // TODO change error message
          const status = STATUS.error;
          notification = {
            title: status,
            text: ERROR.unexpected,
            type: status,
          };

          return Promise.resolve([]);
        }
      })
      .then((sites: SitesData) => {
        return sites;
      })
      .catch(() => {
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

  static delete(site: SiteType): void {
    const request: Request = new Request(`/users/current/sites/${site.id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    });
    let notification: ?Notification;
    return fetch(request)
      .then((response: Response) => {
        if (response.ok) {
          // TODO wrapper for general case?
          const status = STATUS.success;
          notification = {
            title: status,
            text: 'Site successfully removed!',
            type: status,
          };
        } else {
          return Promise.reject(null);
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

        return Promise.reject(null);
      })
      .finally(() => {
        if (notification) {
          PNotify.alert(notification);
        }
      });
  }

  static update(site: SiteType): void {
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
    return fetch(request)
      .then((response: Response) => {
        if (response.ok) {
          // TODO wrapper for general case?
          const status = STATUS.success;
          notification = {
            title: status,
            text: 'Site successfully updated!',
            type: status,
          };
        } else {
          // TODO change error type
          const status = STATUS.error;
          notification = {
            title: status,
            text: ERROR.unexpected,
            type: status,
          };

          return Promise.reject(null);
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

        return Promise.reject(null);
      })
      .finally(() => {
        if (notification) {
          PNotify.alert(notification);
        }
      });
  }
}

export default SiteFetcher;
