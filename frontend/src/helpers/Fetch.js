/*
 * Wrapper on fetch() Native Request Library
 *
 * @param request {Request}        request object
 * @param options {Object}         optional options for request
 *                                  {
 *                                    [onUnauthorized: {Function}],
 *                                    [onNewToken: {Function({Object})}],
 *                                  }
 *
 * @returns {Promise({Response})}  promise that resolves if no network error with response
 *                                 else rejects with response
 */
function Fetch(request, options) {
  if (!options || !(options instanceof Object)) {
    options = {};
  }

  if (request && request instanceof Request) {
    return fetch(request)
      .then((response) => {
        var headers = response.headers;
        if (options.onNewToken &&
            options.onNewToken instanceof Function) {
          var accessToken = headers.get('access-token');
          var tokenType = headers.get('token-type');
          var client = headers.get('client');
          var expiry = headers.get('expiry');
          var uid = headers.get('uid');
          if (accessToken &&
              tokenType &&
              client &&
              expiry &&
              uid) {
            options.onNewToken({
              accessToken: accessToken,
              tokenType: tokenType,
              client: client,
              expiry: expiry,
              uid: uid,
            });
          }
        }

        if (response.status === 401 &&
            options.onUnauthorized &&
            options.onUnauthorized instanceof Function) {
          options.onUnauthorized();
        }

        return Promise.resolve(response);
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  } else {
    return Promise.resolve(null);
  }
}

export default Fetch;
