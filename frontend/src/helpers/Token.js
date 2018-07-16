// @flow

import TOKEN from 'configs/Token';


type TokenData = {
  name?: string,
  username?: string,
  accessToken: string,
  tokenType: string,
  client: string,
  expiry: string,
  uid: string,
};

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
   *                     {
   *                       name: {String},
   *                       username: {String},
   *                       accessToken: {String},
   *                       tokenType: {String},
   *                       client: {String},
   *                       expiry: {String},
   *                       uid: {String},
   *                     }
   *                    or null if no token present
   *
   * @throws {Error}  exception thrown if token is expired
   *                  based on
   *                   {
   *                     expiry: {Integer|String},
   *                   }
   */
  static get(): ?TokenData {
    let parsedStorage: ?TokenData;
    try {
      parsedStorage = JSON.parse(localStorage.getItem(this.key) || '');
    } catch (e) {
      parsedStorage = null;
    }

    let value: ?TokenData;
    if (parsedStorage) {
      let expiry: number = parsedStorage.expiry;

      if (expiry) {
        let currentDate = new Date();
        let expiryDate;
        if (Number.isInteger(parseInt(expiry, 10))) {
          // ensure integer
          expiry = parseInt(expiry, 10);

          let epochTime: number = expiry * 1000;
          expiryDate = new Date(epochTime);
          if (expiryDate > currentDate) {
            value = parsedStorage;
          } else {
            throw new Error('Token expired.');
          }
        } else {
          expiryDate = new Date(expiry);
          if (expiryDate > currentDate) {
            value = parsedStorage;
          } else {
            throw new Error('Token expired.');
          }
        }
      } else {
        value = parsedStorage;
      }
    } else {
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
  static set(data: TokenData) {
    let previousToken = this.get();
    let token;
    if (previousToken) {
      token = Object.assign(previousToken, data);
    } else {
      token = data;
    }
    localStorage.setItem(this.key, JSON.stringify(token));
  }

  /*
   * Clears any token data from client side
   */
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
  static getHeaders(): Headers {
    let token = this.get();

    let headers = new Headers();
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
