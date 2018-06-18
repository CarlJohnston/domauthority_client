import Token from 'helpers/Token';
import TOKEN from 'configs/Token';

var epochExpiry = (new Date().getTime() / 1000) + 999999999;
var VALID_DATA = {
  name: 'user',
  username: 'username',
  accessToken: 'token',
  tokenType: 'Bearer',
  client: 'client',
  expiry: epochExpiry,
  uid: 'email@email.com',
};

describe('authentication token', () => {
  it('authentication token gets authentication token', () => {
    // no token present
    Token.clear();
    var value = Token.get();
    expect(value).toEqual(null);

    // token present
    Token.set(VALID_DATA);
    value = Token.get();
    expect(value).toEqual(VALID_DATA);

    // token present missing some data still returns empty values
    Token.clear();
    var data = Object.assign({}, VALID_DATA);
    delete data['name'];
    delete data['username'];
    Token.set(data);
    value = Token.get();
    expect(value.name).toEqual(undefined);
    expect(value.username).toEqual(undefined);
    var expectedValue = Object.assign({}, VALID_DATA);
    delete expectedValue['name'];
    delete expectedValue['username'];
    delete value['name'];
    delete value['username'];
    expect(value).toEqual(expectedValue);

    // non-JSON parsable token not fetched
    global.localStorage.setItem(TOKEN.authentication.key, "object");
    value = Token.get();
    expect(value).toEqual(null);
  });

  it('authentication token sets authentication token', () => {
    // no previous token
    Token.clear();
    Token.set(VALID_DATA);
    var value = Token.get();
    expect(value).toEqual(VALID_DATA);

    // previous token
    var newData = Object.assign({}, VALID_DATA);
    newData.uid = 'new@new.com';
    expect(newData.uid).not.toEqual(VALID_DATA.uid);
    Token.set(newData);
    value = Token.get();
    expect(value).toEqual(newData);

    // set new partial data still maintains old data
    newData = Object.assign({}, VALID_DATA);
    delete newData['name'];
    delete newData['username'];
    Token.set(VALID_DATA);
    Token.set(newData);
    value = Token.get();
    expect(value.name).toEqual(VALID_DATA.name);
    expect(value.username).toEqual(VALID_DATA.username);

    // invalid value for storing cyclical reference value
    // TODO
  });

  it('properly considers any expiry attribute in token', () => {
    // no expiry date
    Token.clear();
    var data = Object.assign({}, VALID_DATA);
    delete data['expiry'];
    Token.set(data);
    var token = Token.get();
    expect(token).toEqual(data);

    // integer expiry date but not expired
    Token.clear();
    var expiry = (new Date().getTime() + 99999999999) / 1000;
    data = Object.assign({}, VALID_DATA, { expiry: expiry });
    Token.set(data);
    token = Token.get();
    expect(token).toEqual(data);

    // integer expiry date as string but not expired
    Token.clear();
    expiry = ((new Date().getTime() + 99999999999) / 1000).toString();
    data = Object.assign({}, VALID_DATA, { expiry: expiry });
    Token.set(data);
    token = Token.get();
    expect(token).toEqual(data);

    // expiry date but expired
    Token.clear();
    expiry = new Date(1990, 1, 1).getTime() / 1000;
    data = Object.assign({}, VALID_DATA, { expiry: expiry });
    Token.set(data);
    expect(() => {
      Token.get();
    }).toThrow();

    // non-integer expiry date but valid parseable date not expired
    Token.clear();
    expiry = new Date(new Date().getFullYear() + 1, 1, 1).toString();
    data = Object.assign({}, VALID_DATA, { expiry: expiry });
    Token.set(data);
    token = Token.get();
    expect(token).toEqual(token);

    // non-integer expiry date but valid parseable date expired
    Token.clear();
    expiry = new Date(1990, 1, 1).toString();
    data = Object.assign({}, VALID_DATA, { expiry: expiry });
    Token.set(data);
    expect(() => {
      throw new Error('test');
      Token.get();
    }).toThrow();

    // invalid non-parsable date
    Token.clear();
    expiry = 'string';
    data = Object.assign({}, VALID_DATA, { expiry: expiry });
    Token.set(data);
    expect(() => {
      throw new Error('test');
      Token.get();
    }).toThrow();
  });

  it('gets headers', () => {
    // no current token
    Token.clear();
    expect(Token.getHeaders()).toEqual(new Headers());

    // current token
    Token.set(VALID_DATA);
    var headersData = {
      'access-token': VALID_DATA.accessToken,
      'token-type': VALID_DATA.tokenType,
      client: VALID_DATA.client,
      uid: VALID_DATA.uid,
      expiry: VALID_DATA.expiry,
    };
    var expectedHeaders = new Headers(headersData);
    var actualHeaders = Token.getHeaders();
    Object.entries(headersData).forEach(([key, value]) => {
      expect(actualHeaders.get(key)).toEqual(expectedHeaders.get(key));
    });

    // current token with missing header values
    Token.clear();
    Token.set({});
    expect(Token.getHeaders()).toEqual(new Headers({
      'access-token': '',
      'token-type': '',
      client: '',
      expiry: '',
      uid: '',
    }));

    var partialData = {
      accessToken: 'token',
    };
    Token.set({
      accessToken: partialData.accessToken,
    });
    expect(Token.getHeaders()).toEqual(new Headers({
      'access-token': partialData.accessToken,
      'token-type': '',
      client: '',
      expiry: '',
      uid: '',
    }));
  });

  it('clear removes authentication token', () => {
    // no previous token
    Token.set(null);
    Token.clear();
    var value = Token.get();
    expect(value).toEqual(null);

    // previous token
    Token.set(VALID_DATA);
    Token.clear();
    value = Token.get();
    expect(value).toEqual(null);
  });
});
