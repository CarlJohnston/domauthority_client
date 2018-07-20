// @flow

import AuthenticateResponse from 'mixins/AuthenticateResponse';

import type { ParsedResponse } from 'mixins/ParsedResponse.type';


type Options = {
  messages: {
    success: string,
  },
};

/*
 * Helper for login specific authentication API Responses
 */
class LoginResponse extends AuthenticateResponse {
  constructor(data: ParsedResponse, options: {} = {}) {
    super(data, Object.assign({
      messages: {
        success: 'Successfully logged in.',
      },
    }, options));
  }
}

export default LoginResponse;
