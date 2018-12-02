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
  const options = {
    messages: {
      success: 'Successfully logged in.',
    },
  };
  let response;
  beforeEach(() => {
    response = new LoginResponse({}, options);
  });

  it('parses messages properly', () => {
    // errors present
    let data = {
      body: {
        errors: 'error',
      },
    };
    response.set(data);
    let messages = response.getMessages();
    expect(messages).toEqual({
      'error': STATUS.error,
    });

    // no errors present
    data = {
      body: {},
    };
    response.set(data);
    messages = response.getMessages();
    let expectedMessages = {};
    expectedMessages[options.messages.success] = STATUS.success;
    expect(messages).toEqual(expectedMessages);
  });
});
