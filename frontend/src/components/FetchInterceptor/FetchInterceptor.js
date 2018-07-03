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
      request: function (request, config) {
        if (this.props.currentUser &&
            this.props.currentUser.username) {
          let token = Token.get();
          if (token) {
            if (request instanceof Request) {
              let headers = request.headers;
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
              let url = request;
              let headers = new Headers();
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

      response: function (response) {
        if (response && response.status === 401) {
          Token.clear();

          this.props.clearCurrentUser();
        } else {
          let headers = response.headers;
          if (headers) {
            let accessToken = headers.get('access-token');
            let tokenType = headers.get('token-type');
            let client = headers.get('client');
            let expiry = headers.get('expiry');
            let uid = headers.get('uid');
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
    return (
      <React.Fragment>
        {this.props.children}
      </React.Fragment>
    );
  }
}

export default withCurrentUser(FetchInterceptor);
