import AuthenticateResponse from 'mixins/AuthenticateResponse';

/*
 * Helper for login specific authentication API Responses
 */
class LoginResponse extends AuthenticateResponse {
  constructor(data, options) {
    super(data, Object.assign({
      messages: {
        success: 'Successfully logged in.',
      },
    }, options));
  }

  /*
   * @returns {Object}  token object for response object
   *                    or null if invalid data for creating token
   */
  getToken() {
    var token = null;

    if (this.data.body &&
        typeof this.data.body.data === 'object' &&
        this.data.headers &&
        this.data.headers.get('access-token') &&
        this.data.headers.get('client')) {
      token = {
        uid: this.data.body.data.uid,
        name: this.data.body.data.name,
        username: this.data.body.data.username,
        accessToken: this.data.headers.get('access-token'),
        client: this.data.headers.get('client'),
      };
    }

    return token;
  }
}

export default LoginResponse;
