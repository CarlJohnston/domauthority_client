import Token from './Token';
import TOKEN from 'configs/Token';

/*
 * class for dealing with authentication tokens
 */
class AuthenticationToken extends Token {
  static key = TOKEN.authentication.key;

  static get() {
    var value;
    try {
      value = JSON.parse(localStorage.getItem(this.key));
    } catch (e) {
      value = null;
    }
    return value;
  }

  static set(data) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  static clear() {
    localStorage.removeItem(this.key);
  }
}

export default AuthenticationToken;
