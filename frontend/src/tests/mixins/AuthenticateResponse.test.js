import AuthenticateResponse from 'mixins/AuthenticateResponse';
import STATUS from 'configs/Status';

describe('authenticate response response', () => {
  var defaults = {
    success: 'Success.',
  };
  var response;
  beforeEach(() => {
    response = new AuthenticateResponse();
  });

  it('parses errors properly', () => {
    // bad data
    var data = '';
    response.set(data);
    var errors = response.getMessages();
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
    var errorString = 'string';
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
    var errorArray = [
      'error1',
      'error2',
    ];
    var expectedErrorObject = {};
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
    var errorObject = {
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
  });
});
