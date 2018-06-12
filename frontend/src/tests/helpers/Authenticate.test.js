import React from 'react';
import { shallow } from 'enzyme';
import Sinon from 'sinon';

import Authenticate from 'helpers/Authenticate';
import AuthenticationToken from 'helpers/AuthenticationToken';

const VALID_CURRENT_USER_DATA = {
  id: 1,
  provider: 'email',
  uid: 'email@email.com',
  allow_password_change: false,
  username: 'username',
  name: 'name',
  nickname: 'nickname',
  image: null,
  email: 'email@email.com',
};
const VALID_CURRENT_USER_HEADERS = {
  accessToken: 'blah',
  client: 'blah',
};

const NEXT_CURRENT_USER_DATA = VALID_CURRENT_USER_DATA;
const NEXT_CURRENT_USER_HEADERS = Object.assign(VALID_CURRENT_USER_HEADERS, {
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
    expect.assertions(8);

    // valid token
    var data = VALID_CURRENT_USER_DATA;
    var expectation = expect(Authenticate.validate(data)).resolves.toEqual({
      success: true,
      data: {
        id: NEXT_CURRENT_USER_DATA.id,
        provider: NEXT_CURRENT_USER_DATA.provider,
        uid: NEXT_CURRENT_USER_DATA.uid,
        allow_password_change: NEXT_CURRENT_USER_DATA.allow_password_change,
        username: NEXT_CURRENT_USER_DATA.username,
        name: NEXT_CURRENT_USER_DATA.name,
        nickname: NEXT_CURRENT_USER_DATA.nickname,
        image: NEXT_CURRENT_USER_DATA.image,
        email: NEXT_CURRENT_USER_DATA.email,
      },
      headers: {
        'access-token': NEXT_CURRENT_USER_HEADERS.accessToken,
        client: NEXT_CURRENT_USER_HEADERS.client,
      },
    });
    var request = requests.pop();
    request.respond(
      200,
      {
        'Content-Type': 'application/json',
        'access-token': NEXT_CURRENT_USER_HEADERS.accessToken,
        client: NEXT_CURRENT_USER_HEADERS.client,
      },
      JSON.stringify({
        success: true,
        data: NEXT_CURRENT_USER_DATA,
      }),
    );
    await expectation;

    // valid token but missing headers in response
    data = VALID_CURRENT_USER_DATA;
    expectation = expect(Authenticate.validate(data)).rejects.toEqual({
      success: false,
      errors: [
        'Unprocessable Entity',
      ],
    });
    request = requests.pop();
    request.respond(
      200,
      {
        'Content-Type': 'application/json',
        client: NEXT_CURRENT_USER_HEADERS.client,
      },
      JSON.stringify({
        success: true,
        data: NEXT_CURRENT_USER_DATA,
      }),
    );
    await expectation;

    // valid token but non-JSON response data
    var expectedError = '';
    try {
      JSON.parse('string');
    } catch (e) {
      expectedError = e.message;
    }
    expectation = expect(Authenticate.validate(data)).rejects.toEqual({
      success: false,
      errors: [
        expectedError,
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
      'string',
    );
    await expectation;

    // valid token but bad data in response body
    expectation = expect(Authenticate.validate(data)).rejects.toEqual({
      success: false,
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
      success: false,
      errors: [
        'Invalid login credentials',
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
          'Invalid login credentials',
        ],
      })
    );
    await expectation;

    // no current token
    data = null;
    await expect(Authenticate.validate(data)).rejects.toBe(null);

    // bad input
    data = 'string';
    await expect(Authenticate.validate(data)).rejects.toBe(null);

    data = [];
    expectation = expect(Authenticate.validate(data)).rejects.toEqual({
      success: false,
      errors: [
        'Invalid login credentials',
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
          'Invalid login credentials',
        ],
      })
    );
    await expectation;
  });
});
