import QueryString from 'mixins/QueryString';


describe('query string', () => {
  it('returns empty string for empty params object', () => {
    const params = {
    };

    const queryString = QueryString.generate(params);

    expect(queryString).toEqual('');
  });


  it('returns single query string for single key object', () => {
    const params = {
      one: 'one',
    };

    const queryString = QueryString.generate(params);

    expect(queryString).toEqual('?one=one');
  });

  it('returns properly formatted query string for object with length > 1', () => {
    const params = {
      one: true,
      two: 2,
      three: 'three',
      four: null,
      five: undefined,
      six: {
        sixOne: 'blah',
      },
      seven: [
        1,
        2,
        3,
      ],
    };

    const queryString = QueryString.generate(params);

    let expectedQueryString = '?';
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        expectedQueryString += `${key}[]=${value}&`;
      } else {
        expectedQueryString += `${key}=${value}&`;
      }
    });
    expectedQueryString = expectedQueryString.slice(0, -1);

    expect(queryString).toEqual(expectedQueryString);
  });
});
