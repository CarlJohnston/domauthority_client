import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import 'whatwg-fetch';
import PNotify from 'pnotify/dist/umd/PNotify';
import PNotifyButtons from 'pnotify/dist/umd/PNotifyButtons';
import DeviseAuthTokenParser from '../../mixins/DeviseAuthTokenParser';
import STATUS from '../../helpers/Status';

import $ from 'jquery';
window.jQuery = window.$ = $;
require('foundation-sites');

class Login extends Component {
  constructor(props) {
    super(props);

    this.loginFormNode = React.createRef();

    this.deviseAuthTokenParser = new DeviseAuthTokenParser();
  }

  componentDidMount() {
    this.$form = $(this.loginFormNode.current);

    this.$form.foundation();

    this.$form.on('submit', (e) => {
      e.preventDefault();
    });

    this.$form.on('formvalid.zf.abide', (e) => {
      var email = this.$form.find('#email').val();
      var password = this.$form.find('#password').val();
      var request = new Request('/authenticate/sign_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      fetch(request)
        .then((response) => {
          return response.json();
        }).then((body) => {
          this.deviseAuthTokenParser.setData(body);
          var status = this.deviseAuthTokenParser.getStatus();
          var messages = {};
          if (status == STATUS.success) {
            messages['Successfully authenticated.'] = STATUS.success;
          } else {
            var errors = this.deviseAuthTokenParser.getErrors();
            errors.forEach((error) => {
              messages[error] = STATUS.error;
            });
          }

          Object.entries(messages).forEach((message) => {
            PNotify.alert({
              text: message[0],
              type: message[1],
              delay: 2000,
            });
          });

          if (status == STATUS.success) {
            this.props.history.push('/');
          }
        });
    });
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form ref={this.loginFormNode} data-abide noValidate>
          <label>
            Email
            <input id="email" name="email" type="email" placeholder="somebody@example.com" required pattern="email" />
          </label>
          <span className="form-error" data-form-error-for="email">
            Please enter a valid email address.
          </span>
          <label>
            Password
            <input id="password" name="password" type="password" required />
          </label>
          <span className="form-error" data-form-error-for="password">
            Please enter a valid password.
          </span>
          <button className="button" type="submit">Submit</button>
          <p><Link to='/password/forgot'>Forgot your password?</Link></p>
        </form>
      </div>
    );
  }
}

export default Login;
