import URL from 'url';

import ERROR from 'configs/Error';

/*
 * Promise API to request against
 * backend authentication server
 */
const urlPrefix = '/auth';
class Authenticate {
  /*
   * Validate data from token and issue/return a promise for a new
   * token in data, otherwise reject and return any error messages
   *
   * @param data {Object}  data object for token to validate
   *                        {
   *                          uid: {String},
   *                          client: {String},
   *                          accessToken: {String},
   *                        }
   *
   * @returns {Object}     response object for newly issued token
   *                       with JSON already streamed into body property
   *                        {
   *                          body: {Object},
   *                          headers: {Headers},
   *                        }
   */
  static validate(data) {
    return new Promise((resolve, reject) => {
      if (data && typeof data === 'object') {
        var url = urlPrefix + '/validate_token';
        var params = URL.format({
          query: {
            uid: data.uid,
            client: data.client,
            'access-token': data.accessToken,
          },
        });
        var request = new Request(url + params, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        var headers;
        fetch(request)
          .then((response) => {
            headers = response.headers;

            return response.json();
          }).then((body) => {
            if (body.success) {
              data = body.data;
              var accessToken = headers.get('access-token');
              var client = headers.get('client');
              if (data && typeof data === 'object' &&
                  accessToken &&
                  client) {
                resolve({
                  body: body,
                  headers: headers,
                });
              } else {
                reject({
                  body: {
                    success: false,
                    errors: [
                      'Unprocessable Entity'
                    ],
                  },
                  headers: headers,
                });
              }
            } else {
              reject({
                body: {
                  success: false,
                  errors: body.errors,
                },
                headers: headers,
              });
            }
          }).catch((error) => {
            reject({
              body: {
                success: false,
                errors: [
                  ERROR.unexpected,
                ],
              },
              headers: headers,
            });
          });
      } else {
        reject({
          body: {},
          headers: new Headers(),
        });
      }
    });
  }

  /*
   * Register user and return new user
   *
   * @param data {Object}  data object for token to register
   *                        {
   *                          email: {String},
   *                          [username: {String}],
   *                          password: {String},
   *                          password_confirmation: {String},
   *                        }
   *
   * @returns {Object}     response object for newly issued user
   *                       with JSON already streamed into body property
   *                        {
   *                          body: {Object},
   *                          headers: {Headers},
   *                        }
   */
  static register(data) {
    return new Promise((resolve, reject) => {
      if (data && typeof data === 'object') {
        var url = urlPrefix + '/';
        var request = new Request(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        var headers;
        fetch(request)
          .then((response) => {
            headers = response.headers;

            return response.json();
          }).then((body) => {
            if (body.status === 'success') {
              data = body.data;
              if (data && typeof data === 'object') {
                resolve({
                  body: body,
                  headers: headers,
                });
              } else {
                reject({
                  body: {
                    status: 'error',
                    errors: [
                      'Unprocessable Entity'
                    ],
                  },
                  headers: headers,
                });
              }
            } else {
              reject({
                body: {
                  status: 'error',
                  errors: body.errors,
                },
                headers: headers,
              });
            }
          }).catch((error) => {
            reject({
              body: {
                status: 'error',
                errors: [
                  ERROR.unexpected,
                ],
              },
              headers: headers,
            });
          });
      } else {
        reject({
          body: {},
          headers: new Headers(),
        });
      }
    });
  }

  /*
   * Login user and return logged-in user
   *
   * @param data {Object}  data object for token to register
   *                        {
   *                          email: {String},
   *                          password: {String},
   *                        }
   *
   * @returns {Object}     response object for newly issued user
   *                       with JSON already streamed into body property
   *                        {
   *                          body: {Object},
   *                          headers: {Headers},
   *                        }
   */
  static login(data) {
    return new Promise((resolve, reject) => {
      if (data && typeof data === 'object') {
        var url = urlPrefix + '/sign_in';
        var request = new Request(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        var headers;
        var initialResponse;
        fetch(request)
          .then((response) => {
            initialResponse = response;
            headers = response.headers;

            return response.json();
          }).then((body) => {
            if (initialResponse.ok &&
                body.success === undefined) {
              data = body.data;
              if (data && typeof data === 'object') {
                resolve({
                  body: body,
                  headers: headers,
                });
              } else {
                reject({
                  body: {
                    success: false,
                    errors: [
                      'Unprocessable Entity'
                    ],
                  },
                  headers: headers,
                });
              }
            } else {
              reject({
                body: {
                  success: false,
                  errors: body.errors,
                },
                headers: headers,
              });
            }
          }).catch((error) => {
            reject({
              body: {
                success: false,
                errors: [
                  ERROR.unexpected,
                ],
              },
              headers: headers,
            });
          });
      } else {
        reject({
          body: {},
          headers: new Headers(),
        });
      }
    });
  }
}

export default Authenticate;
