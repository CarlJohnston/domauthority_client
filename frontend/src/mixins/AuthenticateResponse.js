import STATUS from 'configs/Status';

/*
 * Helper for authentication API Responses
 */
class AuthenticateResponse {
  constructor(body) {
    this.setBody(body);
  }

  /*
   * @param {Object} body  an object with the following properties
   *                         {
   *                           [status: {Boolean}],
   *                           data: {Object},
   *                           [errors: {Array}],
   *                         }
   */
  setBody(body) {
    if (body && typeof body === 'object') {
      this.body = body;
    } else {
      this.body = {};
    }
  }

  /*
   * @returns {Array} array of error messages
   */
  getErrors() {
    var errors = [];

    if ('errors' in this.body) {
      if (typeof this.body.errors === 'object') {
        if ('full_messages' in this.body.errors) {
          this.body.errors.full_messages.forEach((error) => {
            errors.push(error);
          });
        } else {
          Object.entries(this.body.errors).forEach(([key, value]) => {
            errors.push(value);
          });
        }
      } else {
        errors.push(this.body.errors);
      }
    }

    return errors;
  }

  /*
   * @returns {String} normalized response status to STATUS type
   */
  getStatus() {
    var status = '';

    if (!this.body.errors ||
        (this.body.errors && this.body.errors.length === 0)) {
      status = STATUS.success;
    } else {
      status = STATUS.error;
    }

    return status;
  }

  /*
   * @returns {Object} response body data
   */
  getData() {
    return this.body.data || {};
  }
}

export default AuthenticateResponse;
