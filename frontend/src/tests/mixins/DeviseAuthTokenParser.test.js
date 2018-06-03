import DeviseAuthTokenParser from 'mixins/DeviseAuthTokenParser';
import STATUS from 'configs/Status';

describe('devise_auth_token parser', () => {
  var parser;
  beforeEach(() => {
    parser = new DeviseAuthTokenParser();
  });

  it('parses errors properly', () => {
    // no errors key
    var data = {};
    parser.setData(data);
    var parsedErrors = parser.getErrors();
    expect(parsedErrors).toEqual([]);

    // errors key present
    // errors is empty array
    data = {
      errors: [],
    };
    parser.setData(data);
    parsedErrors = parser.getErrors();
    expect(parsedErrors).toEqual([]);

    // errors is string
    var errorString = 'string';
    data = {
      errors: errorString,
    };
    parser.setData(data);
    parsedErrors = parser.getErrors();
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
    parser.setData(data);
    parsedErrors = parser.getErrors();
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
    parser.setData(data);
    parsedErrors = parser.getErrors();
    expect(parsedErrors).toEqual(errorObject.full_messages);
  });

  it('parses status properly', () => {
    // errors key not present
    var data = {
      key: 'value',
    };
    parser.setData(data);
    var parsedStatus = parser.getStatus();
    expect(parsedStatus).toEqual(STATUS.success);

    // errors key present
    // errors empty
    data = {
      errors: [],
    };
    parser.setData(data);
    parsedStatus = parser.getStatus();
    expect(parsedStatus).toEqual(STATUS.success);

    // errors not empty
    data = {
      errors: [
        'error',
      ],
    };
    parser.setData(data);
    parsedStatus = parser.getStatus();
    expect(parsedStatus).toEqual(STATUS.error);
  });

  it('parses data properly', () => {
    // no data key present
    var data = {
      key: 'value',
    };
    parser.setData(data);
    var parsedData = parser.getData();
    expect(parsedData).toEqual({});

    // data key present
    data = {
      data: {
        key: 'value',
      },
    };
    parser.setData(data);
    parsedData = parser.getData();
    expect(parsedData).toEqual(data.data);
  });
});
