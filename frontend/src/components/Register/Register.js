// @flow

import React, { Component } from 'react';
import PNotify from 'pnotify/dist/umd/PNotify';
import Async from 'async';
import $ from 'jquery';

import Authenticate from 'helpers/Authenticate';
import RegisterResponse from 'mixins/RegisterResponse';

import type { CurrentUserContext as CurrentUserContextType } from 'contexts/CurrentUserContext.types';
import type { RouterHistory } from 'react-router-dom';
import type { ElementRef } from 'react';

window.jQuery = window.$ = $;
require('foundation-sites');


type Props = {
  history: RouterHistory,
  ...$Exact<CurrentUserContextType>,
};

class Register extends Component<Props> {
  registerFormNode: {
    current: ElementRef<'form'> | null,
  };
  $form: JQuery;

  constructor(props: Props) {
    super(props);

    this.registerFormNode = React.createRef();
  }

  componentDidMount() {
    if (this.registerFormNode.current) {
      this.$form = $(this.registerFormNode.current);

      // $FlowFixMe
      this.$form.foundation();

      this.$form.on('submit', (e) => {
        e.preventDefault();
      });

      this.$form.on('formvalid.zf.abide', (e) => {
        const email = this.$form.find('#email').val();
        const username = this.$form.find('#username').val();
        const passwordInitial = this.$form.find('#password-initial').val();
        const passwordConfirm = this.$form.find('#password-confirm').val();

        Async.waterfall([
          (callback) => {
            Authenticate.register({
              email: email,
              username: username,
              password: passwordInitial,
              password_confirmation: passwordConfirm,
            }).then((response) => {
              const registerResponse = new RegisterResponse(response);
              const messages = registerResponse.getMessages();

              const {
                history,
              } = this.props;

              history.push('/login');

              callback(null, messages);
            }).catch((response) => {
              const registerResponse = new RegisterResponse(response);
              const messages = registerResponse.getMessages();

              callback(null, messages);
            });
          }], (error, messages) => {
            Object.entries(messages).forEach(([message, status]) => {
              PNotify.alert({
                title: status,
                text: message,
                type: status,
              });
            });
          });
      });
    }
  }

  render() {
    return (
      <div>
        <div>
          <h1>
            Register
          </h1>
          <form ref={this.registerFormNode} data-abide noValidate>
            <label>
              Email
              <input id='email' name='email' type='email' placeholder='somebody@example.com' required pattern='email' />
            </label>
            <span className='form-error' data-form-error-for='email'>
              Please enter a valid email address.
            </span>
            <label>
              Username
              <div className='input-group'>
                <span className='input-group-label'>@</span>
                <input id='username' className='input-group-field' name='username' type='text' required />
              </div>
            </label>
            <span className='form-error' data-form-error-for='username'>
              Please enter a valid username.
            </span>
            <label>
              Password
              <input id='password-initial' name='password-initial' type='password' required />
            </label>
            <span className='form-error' data-form-error-for='password-initial'>
              Please enter a valid password.
            </span>
            <label>
              Password (Confirmation)
              <input id='password-confirm' name='password-confirm' type='password' required data-equalto='password-initial' />
            </label>
            <span className='form-error' data-form-error-for='password-confirm'>
              Please ensure password matches.
            </span>
            <button className='button' type='submit'>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
