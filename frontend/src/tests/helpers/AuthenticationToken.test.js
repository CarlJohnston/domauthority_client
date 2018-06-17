import AuthenticationToken from 'helpers/AuthenticationToken';
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
    AuthenticationToken.clear();
    var value = AuthenticationToken.get();
    expect(value).toEqual(null);

    // token present
    AuthenticationToken.set(VALID_DATA);
    value = AuthenticationToken.get();
    expect(value).toEqual(VALID_DATA);

    // non-JSON parsable token not fetched
    global.localStorage.setItem(TOKEN.authentication.key, "object");
    value = AuthenticationToken.get();
    expect(value).toEqual(null);
  });

  it('authentication token sets authentication token', () => {
    // no previous token
    AuthenticationToken.clear();
    AuthenticationToken.set(VALID_DATA);
    var value = AuthenticationToken.get();
    expect(value).toEqual(VALID_DATA);

    // previous token
    var newData = Object.assign({}, VALID_DATA);
    newData.uid = 'new@new.com';
    expect(newData.uid).not.toEqual(VALID_DATA.uid);
    AuthenticationToken.set(newData);
    value = AuthenticationToken.get();
    expect(value).toEqual(newData);

    // invalid value for storing cyclical reference value
    // TODO
  });

  it('properly considers any expiry attribute in token', () => {
    // no expiry date
    var data = Object.assign({}, VALID_DATA);
    delete data['expiry'];
    AuthenticationToken.set(data);
    var token = AuthenticationToken.get();
    expect(token).toEqual(data);

    // integer expiry date but not expired
    var expiry = (new Date().getTime() + 99999999999) / 1000;
    data = Object.assign({}, VALID_DATA, { expiry: expiry });
    AuthenticationToken.set(data);
    token = AuthenticationToken.get();
    expect(token).toEqual(data);

    // integer expiry date as string but not expired
    expiry = ((new Date().getTime() + 99999999999) / 1000).toString();
    data = Object.assign({}, VALID_DATA, { expiry: expiry });
    AuthenticationToken.set(data);
    token = AuthenticationToken.get();
    expect(token).toEqual(data);

    // expiry date but expired
    expiry = new Date(1990, 1, 1).getTime() / 1000;
    data = Object.assign({}, VALID_DATA, { expiry: expiry });
    AuthenticationToken.set(data);
    token = AuthenticationToken.get();
    expect(token).toEqual(null);

    // non-integer expiry date but valid parseable date
    expiry = new Date(1990, 1, 1).toString();
    data = Object.assign({}, VALID_DATA, { expiry: expiry });
    AuthenticationToken.set(data);
    token = AuthenticationToken.get();
    expect(token).toEqual(token);

    // invalid non-parsable date
    expiry = 'string';
    data = Object.assign({}, VALID_DATA, { expiry: expiry });
    AuthenticationToken.set(data);
    token = AuthenticationToken.get();
    expect(token).toEqual(null);
  });

  it('gets headers', () => {
    // no current token
    AuthenticationToken.clear();
    expect(AuthenticationToken.getHeaders()).toEqual(new Headers());

    // current token
    AuthenticationToken.set(VALID_DATA);
    var headersData = {
      'access-token': VALID_DATA.accessToken,
      'token-type': VALID_DATA.tokenType,
      client: VALID_DATA.client,
      uid: VALID_DATA.uid,
      expiry: VALID_DATA.expiry,
    };
    var expectedHeaders = new Headers(headersData);
    var actualHeaders = AuthenticationToken.getHeaders();
    Object.entries(headersData).forEach(([key, value]) => {
      expect(actualHeaders.get(key)).toEqual(expectedHeaders.get(key));
    });

    // current token with missing header values
    AuthenticationToken.set({});
    expect(AuthenticationToken.getHeaders()).toEqual(new Headers({
      'access-token': '',
      'token-type': '',
      client: '',
      expiry: '',
      uid: '',
    }));

    var partialData = {
      accessToken: 'token',
    };
    AuthenticationToken.set({
      accessToken: partialData.accessToken,
    });
    expect(AuthenticationToken.getHeaders()).toEqual(new Headers({
      'access-token': partialData.accessToken,
      'token-type': '',
      client: '',
      expiry: '',
      uid: '',
    }));
  });

  it('clear removes authentication token', () => {
    // no previous token
    AuthenticationToken.set(null);
    AuthenticationToken.clear();
    var value = AuthenticationToken.get();
    expect(value).toEqual(null);

    // previous token
    AuthenticationToken.set(VALID_DATA);
    AuthenticationToken.clear();
    value = AuthenticationToken.get();
    expect(value).toEqual(null);
  });
});
