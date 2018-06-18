import TOKEN from 'configs/Token';

/*
 * Authentication token manager
 */
class Token {
  static key = TOKEN.authentication.key;

  /*
   * Get current stored authentication token
   *
   * @returns {Object}  object based on previously stored data
   *                    that is not expired based on any expiry
   *                         {
   *                           name: {String},
   *                           username: {String},
   *                           accessToken: {String},
   *                           tokenType: {String},
   *                           client: {String},
   *                           expiry: {Integer},
   *                           uid: {String},
   *                         }
   */
  static get() {
    var value;
    try {
      var parsedStorage = JSON.parse(localStorage.getItem(this.key));

      var expiry = parsedStorage.expiry;

      if (expiry) {
        var currentDate = new Date();
        var expiryDate;
        if (Number.isInteger(parseInt(expiry, 10))) {
          // ensure integer
          expiry = parseInt(expiry, 10);

          var epochTime = expiry * 1000;
          expiryDate = new Date(epochTime);
          if (expiryDate > currentDate) {
            value = parsedStorage;
          } else {
            value = null;
          }
        } else {
          expiryDate = new Date(expiry);
          if (expiryDate > currentDate) {
            value = parsedStorage;
          } else {
            value = null;
          }
        }
      } else {
        value = parsedStorage;
      }
    } catch (e) {
      value = null;
    }

    return value;
  }

  /*
   * Set authentication token
   *
   * @params data {Object}  the object to stringify and persist as
   *                        the application authentication token
   *                         {
   *                           name: {String},
   *                           username: {String},
   *                           accessToken: {String},
   *                           tokenType: {String},
   *                           client: {String},
   *                           expiry: {Integer},
   *                           uid: {String},
   *                         }
   */
  static set(data) {
    var previousToken = this.get();
    var token;
    if (previousToken) {
      token = Object.assign(previousToken, data);
    } else {
      token = data;
    }
    localStorage.setItem(this.key, JSON.stringify(token));
  }

  static clear() {
    localStorage.removeItem(this.key);
  }

  /*
   * Construct Header object from current authentication token
   * with valid RFC 6750 Bearer Token formatting
   *
   * @returns {Headers}  headers object containing any values from
   *                     current authentication token in the form
   *                      {
   *                        'access-token': {String},
   *                        'token-type': {String},
   *                        client: {String},
   *                        expiry: {Integer|String},
   *                        uid: {String},
   *                      }
   */
  static getHeaders() {
    var token = this.get();

    var headers = new Headers();
    if (token) {
      headers.append('access-token', token.accessToken || '');
      headers.append('token-type', token.tokenType || '');
      headers.append('client', token.client || '');
      headers.append('expiry', token.expiry || '');
      headers.append('uid', token.uid || '');
    }

    return headers;
  }
}

export default Token;
