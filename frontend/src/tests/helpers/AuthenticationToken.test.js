import AuthenticationToken from 'helpers/AuthenticationToken';
import TOKEN from 'configs/Token';

var VALID_DATA = {
  name: 'user',
  username: 'username',
  accessToken: 'token',
  tokenType: 'Bearer',
  client: 'client',
  expiry: 999,
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
