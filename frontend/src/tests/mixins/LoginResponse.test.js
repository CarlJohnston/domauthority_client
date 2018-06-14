import LoginResponse from 'mixins/LoginResponse';
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

describe('register response', () => {
  var options = {
    messages: {
      success: 'Successfully logged in.',
    },
  };
  var response;
  beforeEach(() => {
    response = new LoginResponse({}, options);
  });

  it('parses messages properly', () => {
    // errors present
    var data = {
      body: {
        errors: 'error',
      },
    };
    response.set(data);
    var messages = response.getMessages();
    expect(messages).toEqual({
      'error': STATUS.error,
    });

    // no errors present
    data = {
      body: {},
    };
    response.set(data);
    messages = response.getMessages();
    var expectedMessages = {};
    expectedMessages[options.messages.success] = STATUS.success;
    expect(messages).toEqual(expectedMessages);
  });

  it('fetches token from response', () => {
    // valid data
    var data = {
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
    var token = response.getToken();
    expect(token).toEqual({
      name: VALID_CURRENT_USER_DATA.name,
      username: VALID_CURRENT_USER_DATA.username,
      accessToken: VALID_CURRENT_USER_HEADERS.accessToken,
      tokenType: VALID_CURRENT_USER_HEADERS.tokenType,
      client: VALID_CURRENT_USER_HEADERS.client,
      expiry: VALID_CURRENT_USER_HEADERS.expiry,
    });

    // missing headers
    data = {
      body: {
        data: VALID_CURRENT_USER_DATA,
      },
    };
    response.set(data);
    token = response.getToken();
    expect(token).toEqual(null);

    // wrong header type
    data = {
      body: {
        data: VALID_CURRENT_USER_DATA,
      },
      headers: 'string',
    };
    response.set(data);
    token = response.getToken();
    expect(token).toEqual(null);

    // missing body data
    data = {
      body: {},
      headers: new Headers(VALID_CURRENT_USER_HEADERS),
    };
    response.set(data);
    token = response.getToken();
    expect(token).toEqual(null);


    // wrong body data type
    // missing body data
    data = {
      body: 'string',
      headers: new Headers(VALID_CURRENT_USER_HEADERS),
    };
    response.set(data);
    token = response.getToken();
    expect(token).toEqual(null);

    // no body data or headers
    response.set({});
    token = response.getToken();
    expect(token).toEqual(null);

    // missing body
    data = {
      headers: new Headers(VALID_CURRENT_USER_HEADERS),
    };
    response.set(data);
    token = response.getToken();
    expect(token).toEqual(null);

    // wrong body type
    data = {
      body: 'string',
      headers: new Headers(VALID_CURRENT_USER_HEADERS),
    };
    response.set(data);
    token = response.getToken();
    expect(token).toEqual(null);
  });
});
