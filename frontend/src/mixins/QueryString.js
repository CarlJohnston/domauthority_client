// @flow


/*
 * Generate Rails 5.x compliant query string
 */
class QueryString {
  static generate(params: {}): string {
    let queryString = '?';

    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        const values = value.toString();
        queryString += `${key}[]=${values}&`;
      } else {
        queryString += `${key}=${value}&`;
      }
    });

    queryString = queryString.slice(0, -1);

    return queryString;
  }
}

export default QueryString;
