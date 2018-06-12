import STATUS from 'configs/Status';

/*
 * Helper for authentication API Responses
 */
class AuthenticateResponse {
  constructor(body) {
    this.setBody(body);
  }

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
          Object.entries(this.body.errors).forEach((error) => {
            errors.push(error[1]);
          });
        }
      } else {
        errors.push(this.body.errors);
      }
    }

    return errors;
  }

  /*
   * @returns {String} response status
   */
  getStatus() {
    var status = '';

    if ('errors' in this.body &&
       this.body.errors.length !== 0) {
      status = STATUS.error;
    } else {
      status = STATUS.success;
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
