import AuthenticateResponse from 'mixins/AuthenticateResponse';
import STATUS from 'configs/Status';

const VALID_CURRENT_USER_DATA = {
  id: 1,
  email: 'email@email.com',
  provider: 'email',
  uid: 'user@user.com',
  allow_password_change: false,
  username: 'eight',
  name: null,
  nickname: null,
  image: null
};
const VALID_CURRENT_USER_HEADERS = {
  accessToken: 'access',
  tokenType: 'bearer',
  client: 'client',
  expiry: '1',
  uid: 'email@email.com',
};

describe('authenticate response response', () => {
  let defaults = {
    success: 'Success.',
  };
  let response;
  beforeEach(() => {
    response = new AuthenticateResponse();
  });

  it('parses errors properly', () => {
    // bad data
    let data = '';
    response.set(data);
    let errors = response.getMessages();
    expect(errors).toEqual({
      'Success.': STATUS.success,
    });

    data = 'string';
    response.set(data);
    errors = response.getMessages();
    expect(errors).toEqual({
      'Success.': STATUS.success,
    });

    // no errors key
    data = {};
    response.set(data);
    errors = response.getMessages();
    expect(errors).toEqual({
      'Success.': STATUS.success,
    });

    // errors key present
    // errors is empty array
    data = {
      body: {
        errors: [],
      },
    };
    response.set(data);
    errors = response.getMessages();
    expect(errors).toEqual({});

    // errors is string
    let errorString = 'string';
    data = {
      body: {
        errors: errorString,
      },
    };
    response.set(data);
    errors = response.getMessages();
    expect(errors).toEqual({
      'string': STATUS.error,
    });

    // errors is array
    let errorArray = [
      'error1',
      'error2',
    ];
    let expectedErrorObject = {};
    errorArray.forEach((error) => {
      expectedErrorObject[error] = STATUS.error;
    });
    data = {
      body: {
        errors: errorArray,
      },
    };
    response.set(data);
    errors = response.getMessages();
    expect(errors).toEqual(expectedErrorObject);

    // errors is key-val object without full_messages object
    let errorObject = {
      0: 'error',
      1: 'error',
    };
    data = {
      body: {
        errors: expectedErrorObject,
      },
    };
    expectedErrorObject = {};
    Object.entries(errorObject).forEach(([key, error]) => {
      expectedErrorObject[error] = STATUS.error;
    });
    response.set(data);
    errors = response.getMessages();
    expect(errors).toEqual(expectedErrorObject);

    // errors is key-val object with full_messages object
    errorObject = {
      email: 'error1',
      password: 'error2',
      full_messages: [
        'error1 full',
        'error2 full',
      ],
    };
    data = {
      body: {
        errors: errorObject,
      },
    };
    expectedErrorObject = {};
    errorObject['full_messages'].forEach((error) => {
      expectedErrorObject[error] = STATUS.error;
    });
    response.set(data);
    errors = response.getMessages();
    expect(errors).toEqual(expectedErrorObject);

    // wrong body type
    data = {
      body: 'string',
    };
    response.set(data);
    errors = response.getMessages();
    expect(errors).toEqual({
      'Success.': STATUS.success,
    });

    // wrong headers type
    // wrong body type
    data = {
      headers: 'string',
    };
    response.set(data);
    errors = response.getMessages();
    expect(errors).toEqual({
      'Success.': STATUS.success,
    });
  });

  it('fetches token from response', () => {
    // valid data
    let data = {
      body: {
        data: VALID_CURRENT_USER_DATA,
      },
      headers: new Headers({
        'access-token': VALID_CURRENT_USER_HEADERS.accessToken,
        'token-type': VALID_CURRENT_USER_HEADERS.tokenType,
        client: VALID_CURRENT_USER_HEADERS.client,
        expiry: VALID_CURRENT_USER_HEADERS.expiry,
        uid: VALID_CURRENT_USER_HEADERS.uid,
      }),
    };
    response.set(data);
    let token = response.getTokenData();
    expect(token).toEqual({
      name: VALID_CURRENT_USER_DATA.name,
      username: VALID_CURRENT_USER_DATA.username,
      accessToken: VALID_CURRENT_USER_HEADERS.accessToken,
      tokenType: VALID_CURRENT_USER_HEADERS.tokenType,
      client: VALID_CURRENT_USER_HEADERS.client,
      expiry: VALID_CURRENT_USER_HEADERS.expiry,
      uid: VALID_CURRENT_USER_HEADERS.uid,
    });

    // missing headers
    data = {
      body: {
        data: VALID_CURRENT_USER_DATA,
      },
    };
    response.set(data);
    token = response.getTokenData();
    expect(token).toEqual(null);

    // wrong header type
    data = {
      body: {
        data: VALID_CURRENT_USER_DATA,
      },
      headers: 'string',
    };
    response.set(data);
    token = response.getTokenData();
    expect(token).toEqual(null);

    // missing body data
    data = {
      body: {},
      headers: new Headers(VALID_CURRENT_USER_HEADERS),
    };
    response.set(data);
    token = response.getTokenData();
    expect(token).toEqual(null);


    // wrong body data type
    // missing body data
    data = {
      body: 'string',
      headers: new Headers(VALID_CURRENT_USER_HEADERS),
    };
    response.set(data);
    token = response.getTokenData();
    expect(token).toEqual(null);

    // no body data or headers
    response.set({});
    token = response.getTokenData();
    expect(token).toEqual(null);

    // missing body
    data = {
      headers: new Headers(VALID_CURRENT_USER_HEADERS),
    };
    response.set(data);
    token = response.getTokenData();
    expect(token).toEqual(null);

    // wrong body type
    data = {
      body: 'string',
      headers: new Headers(VALID_CURRENT_USER_HEADERS),
    };
    response.set(data);
    token = response.getTokenData();
    expect(token).toEqual(null);
  });
});
