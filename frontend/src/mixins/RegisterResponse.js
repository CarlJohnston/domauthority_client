import AuthenticateResponse from 'mixins/AuthenticateResponse';

import STATUS from 'configs/Status';

/*
 * Helper for authentication API Responses
 */
class RegisterResponse extends AuthenticateResponse {
  constructor(data, options) {
    super(data, Object.assign({
      messages: {
        success: 'Successfully registered. Please login using the form below.',
      },
    }, options));
  }
}

export default RegisterResponse;
