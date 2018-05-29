import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import PNotify from 'pnotify/dist/umd/PNotify';
import PNotifyButtons from 'pnotify/dist/umd/PNotifyButtons';

import $ from 'jquery';
window.jQuery = window.$ = $;
require('foundation-sites');

class Register extends Component {
  constructor(props) {
    super(props);

    this.registerFormNode = React.createRef();
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
      var request = new Request('/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: passwordInitial,
          password_confirmation: passwordConfirm,
        }),
      });
      fetch(request)
        .then((response) => {
          var statusType;

          return response.json();
        }).then((body) => {
          var messages = []
          if (body.errors) {
            if (body.errors.full_messages) {
              body.errors.full_messages.forEach((error) => {
                messages.push(error);
              });
            } else {
              body.errors.forEach((error) => {
                messages.push(error);
              });
            }
          } else {
            messages.push('Account successfully created.');
          }

          messages.forEach((message) => {
            PNotify.alert({
              text: message,
              type: body.status || 'error',
              delay: 3000,
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
