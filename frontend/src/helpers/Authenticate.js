// @flow

import URL from 'url';

import ERROR from 'configs/Error';

import type { ParsedResponse } from 'mixins/ParsedResponse.type';


type TokenHeaders = {
  uid: string,
  client: string,
  accessToken: string,
};

type RegistrationData = {
  username: string,
  email: string,
  password: string,
  password_confirmation: string,
};

type LoginData = {
  email: string,
  password: string,
};

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
   * @returns {Promise}    promise that on success resolves to
   *                       response object for newly issued token
   *                       with JSON already streamed into body property
   *                        {
   *                          body: {Object},
   *                          headers: {Headers},
   *                        }
   */
  static validate(data: TokenHeaders): Promise<ParsedResponse> {
    return new Promise((resolve, reject) => {
      if (data && typeof data === 'object') {
        let url: string = urlPrefix + '/validate_token';
        let params: string = URL.format({
          query: {
            uid: data.uid,
            client: data.client,
            'access-token': data.accessToken,
          },
        });
        let request: Request = new Request(url + params, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        let headers: Headers;
        fetch(request)
          .then((response) => {
            headers = response.headers;

            return response.json();
          }).then((body) => {
            if (body.success) {
              data = body.data;
              let accessToken: string = headers.get('access-token');
              let client: string = headers.get('client');
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
   * @returns {Promise}    promise that resolves on success to
   *                       response object for newly issued user
   *                       with JSON already streamed into body property
   *                        {
   *                          body: {Object},
   *                          headers: {Headers},
   *                        }
   */
  static register(data: RegistrationData): Promise<ParsedResponse> {
    return new Promise((resolve, reject) => {
      if (data && typeof data === 'object') {
        let url: string = urlPrefix + '/';
        let request: Request = new Request(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        let headers: Headers;
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
   * @returns {Promsise}   promise that resolves on success to
   *                       response object for newly issued user
   *                       with JSON already streamed into body property
   *                        {
   *                          body: {Object},
   *                          headers: {Headers},
   *                        }
   */
  static login(data: LoginData): Promise<ParsedResponse> {
    return new Promise((resolve, reject) => {
      if (data && typeof data === 'object') {
        let url: string = urlPrefix + '/sign_in';
        let request: Request = new Request(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        let headers: Headers;
        let initialResponse: Response;
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
