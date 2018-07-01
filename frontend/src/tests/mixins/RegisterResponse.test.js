import RegisterResponse from 'mixins/RegisterResponse';
import STATUS from 'configs/Status';

describe('register response', () => {
  const options = {
    messages: {
      success: 'Successfully registered. Please login using the form below.',
    },
  };
  let response;
  beforeEach(() => {
    response = new RegisterResponse({}, options);
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
