import Token from './Token';
import TOKEN from 'configs/Token';

/*
 * class for dealing with authentication tokens
 */
class AuthenticationToken extends Token {
  constructor() {
    super();

    this.key = TOKEN.authentication.key;
  }

  get() {
    var value;
    try {
      value = JSON.parse(localStorage.getItem(this.key));
    } catch (e) {
      value = null;
    }
    return value;
  }

  set(data) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  clear() {
    localStorage.removeItem(this.key);
  }
}

export default AuthenticationToken;
