import AuthenticateResponse from 'mixins/AuthenticateResponse';
import STATUS from 'configs/Status';

describe('authenticate response response', () => {
  var response;
  beforeEach(() => {
    response = new AuthenticateResponse();
  });

  it('parses errors properly', () => {
    // no errors key
    var data = {};
    response.setData(data);
    var parsedErrors = response.getErrors();
    expect(parsedErrors).toEqual([]);

    // errors key present
    // errors is empty array
    data = {
      errors: [],
    };
    response.setData(data);
    parsedErrors = response.getErrors();
    expect(parsedErrors).toEqual([]);

    // errors is string
    var errorString = 'string';
    data = {
      errors: errorString,
    };
    response.setData(data);
    parsedErrors = response.getErrors();
    expect(parsedErrors).toEqual([
      errorString,
    ]);

    // errors is key-val object without full_messages object
    var errorObject = {
      0: 'error',
      1: 'error',
    };
    data = {
      errors: errorObject,
    };
    response.setData(data);
    parsedErrors = response.getErrors();
    expect(parsedErrors).toEqual(Object.values(errorObject));

    // errors is key-val object with full_messages object
    errorObject = {
      email: 'error1',
      password: 'error2',
      full_messages: [
        'error1',
        'error2',
      ],
    };
    data = {
      errors: errorObject,
    };
    response.setData(data);
    parsedErrors = response.getErrors();
    expect(parsedErrors).toEqual(errorObject.full_messages);
  });

  it('parses status properly', () => {
    // errors key not present
    var data = {
      key: 'value',
    };
    response.setData(data);
    var parsedStatus = response.getStatus();
    expect(parsedStatus).toEqual(STATUS.success);

    // errors key present
    // errors empty
    data = {
      errors: [],
    };
    response.setData(data);
    parsedStatus = response.getStatus();
    expect(parsedStatus).toEqual(STATUS.success);

    // errors not empty
    data = {
      errors: [
        'error',
      ],
    };
    response.setData(data);
    parsedStatus = response.getStatus();
    expect(parsedStatus).toEqual(STATUS.error);
  });

  it('parses data properly', () => {
    // no data key present
    var data = {
      key: 'value',
    };
    response.setData(data);
    var parsedData = response.getData();
    expect(parsedData).toEqual({});

    // data key present
    data = {
      data: {
        key: 'value',
      },
    };
    response.setData(data);
    parsedData = response.getData();
    expect(parsedData).toEqual(data.data);
  });
});
