// @flow

import AuthenticateResponse from 'mixins/AuthenticateResponse';

import type { ParsedResponse } from 'mixins/ParsedResponse.type';


type Options = {
  messages: {
    success: string,
  },
};

/*
 * Helper for registration specific authentication API Responses
 */
class RegisterResponse extends AuthenticateResponse {
  constructor(data: ParsedResponse, options: {} = {}) {
    super(data, Object.assign({
      messages: {
        success: 'Successfully registered. Please login using the form below.',
      },
    }, options));
  }
}

export default RegisterResponse;
