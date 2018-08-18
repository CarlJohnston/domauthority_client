// @flow

import React, { Component } from 'react';
import type { Node } from 'react';
import fetchIntercept from 'fetch-intercept';

import Token from 'helpers/Token';

import withCurrentUser from 'components/hocs/withCurrentUser';

import type { CurrentUserContext as CurrentUserContextType } from 'contexts/CurrentUserContext.types';


type Props = {
  children: Node,
  ...$Exact<CurrentUserContextType>,
};

class FetchInterceptor extends Component<Props> {
  unregisterFetchIntercept: () => void;

  constructor(props: Props) {
    super(props);

    this.unregisterFetchIntercept = fetchIntercept.register({
      request: function request(request, config) {
        const {
          currentUser,
        } = this.props;
        if (currentUser &&
            currentUser.username) {
          const token = Token.get();
          if (token) {
            if (request instanceof Request) {
              const {
                headers,
              } = request;
              if (headers) {
                if (headers instanceof Headers) {
                  headers.set('access-token', token.accessToken);
                  headers.set('token-type', token.tokenType);
                  headers.set('client', token.client);
                  headers.set('expiry', token.expiry);
                  headers.set('uid', token.uid);
                } else {
                  if (typeof headers === 'object') {
                    headers['access-token'] = token.accessToken;
                    headers['token-type'] = token.tokenType;
                    headers['client'] = token.client;
                    headers['expiry'] = token.expiry;
                    headers['uid'] = token.uid;
                  }
                }
              } else {
                request.headers = new Headers();
                headers.set('access-token', token.accessToken);
                headers.set('token-type', token.tokenType);
                headers.set('client', token.client);
                headers.set('expiry', token.expiry);
                headers.set('uid', token.uid);
              }
            } else {
              const url = request;
              const headers = new Headers();
              headers.set('access-token', token.accessToken);
              headers.set('token-type', token.tokenType);
              headers.set('client', token.client);
              headers.set('expiry', token.expiry);
              headers.set('uid', token.uid);
              request = new Request(url, {
                headers: headers,
              });
            }
          }
        }

        return [request, config];
      }.bind(this),

      response: function response(response) {
        const {
          clearCurrentUser,
        } = this.props;

        if (response && response.status === 401) {
          Token.clear();

          clearCurrentUser();
        } else {
          const {
            headers,
          } = response;
          if (headers) {
            const accessToken = headers.get('access-token');
            const tokenType = headers.get('token-type');
            const client = headers.get('client');
            const expiry = headers.get('expiry');
            const uid = headers.get('uid');
            if (accessToken &&
                tokenType &&
                client &&
                expiry &&
                uid) {
              Token.set({
                accessToken: accessToken,
                tokenType: tokenType,
                client: client,
                expiry: expiry,
                uid: uid,
              });
            }
          }
        }

        return response;
      }.bind(this),
    });
  }

  componentWillUnmount() {
    this.unregisterFetchIntercept();
  }

  render() {
    const {
      children,
    } = this.props;

    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    );
  }
}

export default withCurrentUser(FetchInterceptor);
