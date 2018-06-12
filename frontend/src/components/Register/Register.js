import React, { Component } from 'react';
import PNotify from 'pnotify/dist/umd/PNotify';

import Authenticate from 'helpers/Authenticate';
import AuthenticateResponse from 'mixins/AuthenticateResponse';

import STATUS from 'configs/Status';

import $ from 'jquery';
window.jQuery = window.$ = $;
require('foundation-sites');

class Register extends Component {
  constructor(props) {
    super(props);

    this.registerFormNode = React.createRef();

    this.authenticateResponse = new AuthenticateResponse();
  }

  componentDidMount() {
    this.$form = $(this.registerFormNode.current);

    this.$form.foundation();

    this.$form.on('submit', (e) => {
      e.preventDefault();
    });

    this.$form.on('formvalid.zf.abide', (e) => {
      var email = this.$form.find('#email').val();
      var username = this.$form.find('#username').val();
      var passwordInitial = this.$form.find('#password-initial').val();
      var passwordConfirm = this.$form.find('#password-confirm').val();

      Authenticate.register({
        email: email,
        username: username,
        password: passwordInitial,
        'password_confirmation': passwordConfirm,
      }).then((response) => {
        var messages = {};

        this.authenticateResponse.setBody(response.body);

        messages['Successfully registered. Please login using the login form.'] = STATUS.success;

        Object.entries(messages).forEach((message) => {
          PNotify.alert({
            text: message[0],
            type: message[1],
            delay: 2000,
          });
        });

        this.props.history.push('/login');
      }).catch((response) => {
        var messages = {};

        this.authenticateResponse.setBody(response.body);

        var errors = this.authenticateResponse.getErrors();
        errors.forEach((error) => {
          messages[error] = STATUS.error;
        });

        Object.entries(messages).forEach((message) => {
          PNotify.alert({
            text: message[0],
            type: message[1],
            delay: 2000,
          });
        });
      });
    });
  }

  render() {
    return (
      <div>
        <div>
          <h1>Register</h1>
          <form ref={this.registerFormNode} data-abide noValidate>
            <label>
              Email
              <input id="email" name="email" type="email" placeholder="somebody@example.com" required pattern="email" />
            </label>
            <span className="form-error" data-form-error-for="email">
              Please enter a valid email address.
            </span>
            <label>
              Username
              <div className="input-group">
                <span className="input-group-label">@</span>
                <input id="username" className="input-group-field" name="username" type="text" required />
              </div>
            </label>
            <span className="form-error" data-form-error-for="username">
              Please enter a valid username.
            </span>
            <label>
              Password
              <input id="password-initial" name="password-initial" type="password" required />
            </label>
            <span className="form-error" data-form-error-for="password-initial">
              Please enter a valid password.
            </span>
            <label>
              Password (Confirmation)
              <input id="password-confirm" name="password-confirm" type="password" required data-equalto="password-initial" />
            </label>
            <span className="form-error" data-form-error-for="password-confirm">
              Please ensure password matches.
            </span>
            <button className="button" type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
