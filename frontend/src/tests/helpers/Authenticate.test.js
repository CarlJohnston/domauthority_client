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
  'access-token': 'blah',
  client: 'blah',
};

const NEXT_CURRENT_USER_DATA = VALID_CURRENT_USER_DATA;
const NEXT_CURRENT_USER_HEADERS = Object.assign(VALID_CURRENT_USER_HEADERS, {
  'access-token': 'new',
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
      body: {
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
      },
      headers: new Headers({
        'content-type': 'application/json',
        'access-token': NEXT_CURRENT_USER_HEADERS['access-token'],
        client: NEXT_CURRENT_USER_HEADERS.client,
      }),
    });
    var request = requests.pop();
    request.respond(
      200,
      {
        'Content-Type': 'application/json',
        'access-token': NEXT_CURRENT_USER_HEADERS['access-token'],
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
      body: {
        success: false,
        errors: [
          'Unprocessable Entity',
        ],
      },
      headers: new Headers({
        'content-type': 'application/json',
      })
    });
    request = requests.pop();
    request.respond(
      200,
      {
        'Content-Type': 'application/json',
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
      body: {
        success: false,
        errors: [
          expectedError,
        ],
      },
      headers: new Headers({
        'content-type': 'application/json',
        'access-token': NEXT_CURRENT_USER_HEADERS['access-token'],
        client: NEXT_CURRENT_USER_HEADERS.client,
      }),
    });
    request = requests.pop();
    request.respond(
      200,
      {
        'Content-Type': 'application/json',
        'access-token': NEXT_CURRENT_USER_HEADERS['access-token'],
        client: NEXT_CURRENT_USER_HEADERS.client,
      },
      'string',
    );
    await expectation;

    // valid token but bad data in response body
    expectation = expect(Authenticate.validate(data)).rejects.toEqual({
      body: {
        success: false,
        errors: [
          'Unprocessable Entity'
        ],
      },
      headers: new Headers({
        'content-type': 'application/json',
        'access-token': NEXT_CURRENT_USER_HEADERS['access-token'],
        client: NEXT_CURRENT_USER_HEADERS.client,
      }),
    });
    request = requests.pop();
    request.respond(
      200,
      {
        'Content-Type': 'application/json',
        'access-token': NEXT_CURRENT_USER_HEADERS['access-token'],
        client: NEXT_CURRENT_USER_HEADERS.client,
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
      body: {
        success: false,
        errors: [
          'Invalid login credentials',
        ],
      },
      headers: new Headers({
        'content-type': 'application/json',
      }),
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
    await expect(Authenticate.validate(data)).rejects.toEqual({
      body: {},
      headers: new Headers(),
    });

    // bad input
    data = 'string';
    await expect(Authenticate.validate(data)).rejects.toEqual({
      body: {},
      headers: new Headers(),
    });

    data = [];
    expectation = expect(Authenticate.validate(data)).rejects.toEqual({
      body: {
        success: false,
        errors: [
          'Invalid login credentials',
        ],
      },
      headers: new Headers({
        'content-type': 'application/json',
      }),
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

  it('registers user', async () => {
    expect.assertions(2);

    // registers user with well-formed data
    var data = {
      uid: 'new@new.com',
      id: 21,
      email: 'new@new.com',
      provider: 'email',
      allow_password_change: false,
      username: 'new',
      name: null,
      nickname: null,
      image: null,
    };
    var expectation = expect(Authenticate.register({
      email: data.email,
      password: 'password',
      'password_confirmation': 'password',
    })).resolves.toEqual({
      body: {
        status: 'success',
        data: data,
      },
      headers: new Headers({
        'content-type': 'application/json',
      }),
    });
    var request = requests.pop();
    request.respond(
      200,
      {
        'Content-Type': 'application/json',
      },
      JSON.stringify({
        status: 'success',
        data: data,
      }),
    );
    await expectation;

    // does not register user with poorly-formed data
    var errors = {
      one: 'error1',
      two: 'error2',
      'full_messages': [
        'error1',
        'error2',
      ],
    };
    expectation = expect(Authenticate.register({
      email: data.email,
      password: 'password',
      'password_confirmation': 'password_invalid',
    })).rejects.toEqual({
      body: {
        status: 'error',
        errors: errors,
      },
      headers: new Headers({
        'content-type': 'application/json',
      }),
    });
    request = requests.pop();
    request.respond(
      422,
      {
        'Content-Type': 'application/json',
      },
      JSON.stringify({
        status: 'error',
        data: data,
        errors: errors,
      }),
    );
    await expectation;
  });

  it('login user', async () => {
    expect.assertions(4);

    // login user with well-formed correct data
    var data = {
      email: 'email@email.com',
      password: 'password',
    };
    var expectation = expect(Authenticate.login(data)).resolves.toEqual({
      body: {
        data: data,
      },
      headers: new Headers({
        'content-type': 'application/json',
      }),
    });
    var request = requests.pop();
    request.respond(
      200,
      {
        'Content-Type': 'application/json',
      },
      JSON.stringify({
        data: data,
      }),
    );
    await expectation;

    // does not login user with well-formed but incorrect data
    data = {
      email: 'email@email.com',
    };
    expectation = expect(Authenticate.login(data)).rejects.toEqual({
      body: {
        success: false,
        errors: [
          'Invalid login credentials. Please try again.',
        ],
      },
      headers: new Headers({
        'content-type': 'application/json',
      }),
    });
    request = requests.pop();
    request.respond(
      200,
      {
        'Content-Type': 'application/json',
      },
      JSON.stringify({
        success: false,
        errors: [
          'Invalid login credentials. Please try again.',
        ],
      }),
    );
    await expectation;

    data = {};
    expectation = expect(Authenticate.login(data)).rejects.toEqual({
      body: {
        success: false,
        errors: [
          'Invalid login credentials. Please try again.',
        ],
      },
      headers: new Headers({
        'content-type': 'application/json',
      }),
    });
    request = requests.pop();
    request.respond(
      200,
      {
        'Content-Type': 'application/json',
      },
      JSON.stringify({
        success: false,
        errors: [
          'Invalid login credentials. Please try again.',
        ],
      }),
    );
    await expectation;

    // does not login user with poorly-formed data
    data = {
      email: 'email@email.com',
    };
    expectation = expect(Authenticate.login({
      email: data.email,
    })).rejects.toEqual({
      body: {
        success: false,
        errors: [
          'Invalid login credentials. Please try again.',
        ],
      },
      headers: new Headers({
        'content-type': 'application/json',
      }),
    });
    request = requests.pop();
    request.respond(
      422,
      {
        'Content-Type': 'application/json',
      },
      JSON.stringify({
        success: false,
        errors: [
          'Invalid login credentials. Please try again.',
        ],
      }),
    );
    await expectation;
  });
});
