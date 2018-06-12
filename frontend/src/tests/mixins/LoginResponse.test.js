import LoginResponse from 'mixins/LoginResponse';
import STATUS from 'configs/Status';

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
});
