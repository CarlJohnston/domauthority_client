import URL from 'url';

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
        var request = new Request(urlPrefix + '/validate_token' + params, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        var headers;
        var status;
        fetch(request)
          .then((response) => {
            headers = response.headers;
            status = response.status;

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
                  error.message,
                ],
              },
              headers: headers,
            });
          });
      } else {
        reject(null);
      }
    });
  }
}

export default Authenticate;
