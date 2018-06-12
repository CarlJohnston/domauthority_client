import RegisterResponse from 'mixins/RegisterResponse';
import STATUS from 'configs/Status';

describe('register response', () => {
  var options = {
    messages: {
      success: 'Successfully registered. Please login using the form below.',
    },
  };
  var response;
  beforeEach(() => {
    response = new RegisterResponse({}, options);
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
