import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';
import PNotify from 'pnotify/dist/umd/PNotify';

import AuthenticateResponse from 'mixins/AuthenticateResponse';

import AuthenticationToken from 'helpers/AuthenticationToken';
import withCurrentUser from 'components/hocs/withCurrentUser';

import STATUS from 'configs/Status';

import $ from 'jquery';
window.jQuery = window.$ = $;
require('foundation-sites');

class Login extends Component {
  constructor(props) {
    super(props);

    this.loginFormNode = React.createRef();

    this.authenticateResponse = new AuthenticateResponse();
  }

  componentDidMount() {
    this.$form = $(this.loginFormNode.current);

    this.$form.foundation();

    this.$form.on('formvalid.zf.abide', function (e) {
      this.validLoginFormSubmit(e);
    }.bind(this));
  }

  validLoginFormSubmit(e) {
    var email = this.$form.find('#email').val();
    var password = this.$form.find('#password').val();
    var request = new Request('/auth/sign_in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    var headers;
    fetch(request)
      .then((response) => {
        headers = response.headers;

        return response.json();
      }).then((body) => {
        this.authenticateResponse.setBody(body);
        var status = this.authenticateResponse.getStatus();
        var messages = {};
        if (status === STATUS.success) {
          messages['Successfully authenticated.'] = STATUS.success;
        } else {
          var errors = this.authenticateResponse.getErrors();
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

        if (status === STATUS.success) {
          var data = body.data;
          headers.forEach((value, key) => {
            headers[key] = value;
          });
          var token = {
            uid: data.uid,
            name: data.name,
            username: data.username,
            accessToken: headers['access-token'],
            client: headers.client,
          };
          var authenticationToken = new AuthenticationToken();
          authenticationToken.set(token);

          this.props.setCurrentUser(token);

          this.props.history.push('/');
        }
      });
  }

  loginFormSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form ref={this.loginFormNode} data-abide noValidate onSubmit={this.loginFormSubmit}>
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

export default withCurrentUser(Login);
