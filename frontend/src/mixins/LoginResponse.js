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
}

export default LoginResponse;
