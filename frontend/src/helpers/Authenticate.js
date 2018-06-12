import URL from 'url';

/*
 * Promise API to request against
 * backend authentication server
 */
const urlPrefix = '/auth';
class Authenticate {
  /*
   * Validate data from token and issue/return a new
   * token, otherwise reject and return status/message
   *
   * @param data  data object for token to validate
   *              {
   *                uid: [String],
   *                client: [String],
   *                accessToken: [String],
   *              }
   *
   * @returns    data object for newly issue token
   *              {
   *                uid: [String],
   *                client: [String],
   *                accessToken: [String],
   *              }
   */
  static validate(data) {
    return new Promise((resolve, reject) => {
      if (data && typeof data == 'object') {
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
                  uid: data.uid,
                  name: data.name,
                  username: data.username,
                  accessToken: headers.get('access-token'),
                  client: headers.get('client'),
                });
              } else {
                reject({
                  status: 422,
                  errors: [
                    'Unprocessable Entity'
                  ],
                });
              }
            } else {
              reject({
                status: status,
                errors: body.errors,
              });
            }
          }).catch((error) => {
            reject({
              status: 500,
              errors: [
                error.message,
              ],
            });
          });
    } else {
        resolve(null);
      }
    });
  }
}

export default Authenticate;
