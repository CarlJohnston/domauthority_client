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
    newData.uid = VALID_DATA.uid + 1;
    AuthenticationToken.set(newData);
    value = AuthenticationToken.get();
    expect(value).toEqual(newData);

    // invalid value for storing cyclical reference value
    // TODO
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
