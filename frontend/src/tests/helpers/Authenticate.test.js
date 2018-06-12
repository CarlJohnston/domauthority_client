import React from 'react';
import { shallow } from 'enzyme';
import Sinon from 'sinon';

import Authenticate from 'helpers/Authenticate';
import AuthenticationToken from 'helpers/AuthenticationToken';

const VALID_CURRENT_USER_DATA = {
  uid: 1,
  name: 'name',
  username: 'username',
  accessToken: 'blah',
  client: 'blah',
};

const NEXT_CURRENT_USER_DATA = Object.assign(VALID_CURRENT_USER_DATA, {
  accessToken: 'new',
});

describe('authenticate', () => {
  var xhr;
  var requests = [];
  beforeAll(() => {
    xhr = Sinon.useFakeXMLHttpRequest();
    xhr.onCreate = function (xhr) {
      requests.push(xhr);
    };
  });

  afterAll(() => {
    xhr.restore();
  });

  it('validates token', async () => {
    expect.assertions(6);

    // valid token
    var data = VALID_CURRENT_USER_DATA;
    var expectation = expect(Authenticate.validate(data)).resolves.toEqual(NEXT_CURRENT_USER_DATA);
    var request = requests.pop();
    request.respond(
      200,
      {
        'Content-Type': 'application/json',
        'access-token': NEXT_CURRENT_USER_DATA.accessToken,
        client: data.client,
      },
      JSON.stringify({
        success: true,
        data: NEXT_CURRENT_USER_DATA,
      }),
    );
    await expectation;

    // valid token but missing headers in response
    expectation = expect(Authenticate.validate(data)).rejects.toEqual({
      status: 422,
      errors: [
        'Unprocessable Entity'
      ],
    });
    request = requests.pop();
    request.respond(
      200,
      {
        'Content-Type': 'application/json',
        client: data.client,
      },
      JSON.stringify({
        success: true,
        data: NEXT_CURRENT_USER_DATA,
      }),
    );
    await expectation;

    // valid token but bad data in response body
    expectation = expect(Authenticate.validate(data)).rejects.toEqual({
      status: 422,
      errors: [
        'Unprocessable Entity'
      ],
    });
    request = requests.pop();
    request.respond(
      200,
      {
        'Content-Type': 'application/json',
        'access-token': NEXT_CURRENT_USER_DATA.accessToken,
        client: data.client,
      },
      JSON.stringify({
        success: true,
        data: 'blah',
      }),
    );
    await expectation;

    // invalid token
    data = {
      blah: 'blah',
    };
    expectation = expect(Authenticate.validate(data)).rejects.toEqual({
      status: 401,
      errors: [
        'Unauthorized'
      ],
    });
    request = requests.pop();
    request.respond(
      401,
      {
        'Content-Type': 'application/json',
      },
      JSON.stringify({
        success: false,
        errors: [
          'Unauthorized',
        ],
      })
    );
    await expectation;

    // no current token
    data = null;
    await expect(Authenticate.validate(data)).resolves.toBe(null);

    // bad input
    data = 'string';
    await expect(Authenticate.validate(data)).resolves.toBe(null);
  });
});
