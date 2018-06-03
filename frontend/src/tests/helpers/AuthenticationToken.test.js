import AuthenticationToken from 'helpers/AuthenticationToken';
import TOKEN from 'configs/Token';

var VALID_DATA = {
  uid: 1,
  name: 'user',
  username: 'username',
  accessToken: 'blah',
  client: 'blah',
};
describe('authentication token', () => {
  var authenticationToken;
  beforeEach(() => {
    authenticationToken = new AuthenticationToken();
  });

  it('authentication token gets authentication token', () => {
    // no token present
    authenticationToken.clear();
    var value = authenticationToken.get();
    expect(value).toEqual(null);

    // token present
    authenticationToken.set(VALID_DATA);
    value = authenticationToken.get();
    expect(value).toEqual(VALID_DATA);

    // non-JSON parsable token not fetched
    global.localStorage.setItem(TOKEN.authentication.key, "object");
    value = authenticationToken.get();
    expect(value).toEqual(null);
  });

  it('authentication token sets authentication token', () => {
    // no previous token
    authenticationToken.clear();
    authenticationToken.set(VALID_DATA);
    var value = authenticationToken.get();
    expect(value).toEqual(VALID_DATA);

    // previous token
    var newData = Object.assign({}, VALID_DATA);
    newData.uid = VALID_DATA.uid + 1;
    authenticationToken.set(newData);
    value = authenticationToken.get();
    expect(value).toEqual(newData);

    // invalid value for storing cyclical reference value
    // TODO
  });

  it('clear removes authentication token', () => {
    // no previous token
    authenticationToken.set(null);
    authenticationToken.clear();
    var value = authenticationToken.get();
    expect(value).toEqual(null);

    // previous token
    authenticationToken.set(VALID_DATA);
    authenticationToken.clear();
    value = authenticationToken.get();
    expect(value).toEqual(null);
  });
});
