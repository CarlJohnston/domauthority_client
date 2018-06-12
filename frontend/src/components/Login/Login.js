import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';
import PNotify from 'pnotify/dist/umd/PNotify';
import Async from 'async';

import Authenticate from 'helpers/Authenticate';
import LoginResponse from 'mixins/LoginResponse';

import AuthenticationToken from 'helpers/AuthenticationToken';
import withCurrentUser from 'components/hocs/withCurrentUser';

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

    this.$form.on('formvalid.zf.abide', function (e) {
      this.validLoginFormSubmit(e);
    }.bind(this));
  }

  validLoginFormSubmit(e) {
    var email = this.$form.find('#email').val();
    var password = this.$form.find('#password').val();
    Async.waterfall([
      (callback) => {
        Authenticate.login({
          email: email,
          password: password,
        }).then((response) => {
          var loginResponse = new LoginResponse(response);
          var messages = loginResponse.getMessages();

          var token = loginResponse.getToken();

          var authenticationToken = new AuthenticationToken();
          authenticationToken.set(token);

          this.props.setCurrentUser(token);

          this.props.history.push('/');

          callback(null, messages);
        }).catch((response) => {
          var loginResponse = new LoginResponse(response);
          var messages = loginResponse.getMessages();

          callback(null, messages);
        });
      }], (error, messages) => {
        Object.entries(messages).forEach(([message, status]) => {
          PNotify.alert({
            text: message,
            type: status,
            delay: 2000,
          });
        });
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
