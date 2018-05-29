import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import 'whatwg-fetch';
import PNotify from 'pnotify/dist/umd/PNotify';
import PNotifyButtons from 'pnotify/dist/umd/PNotifyButtons';

import $ from 'jquery';
window.jQuery = window.$ = $;
require('foundation-sites');

class Login extends Component {
  constructor(props) {
    super(props);

    this.loginFormNode = React.createRef();
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
        body: {
          email: email,
          password: password,
        },
      });
      fetch(request)
        .then((response) => {
          var statusType;
          if (response.status == 200) {
            statusType = 'success';
          } else {
            statusType = 'error';
          }
          PNotify.alert({
            text: response.statusText,
            type: statusType,
            delay: 3000,
          });
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
