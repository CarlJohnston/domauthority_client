import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

class Login extends Component {
  render() {
    return (
      <div>
        <h1>Login</h1>
        <form action="/authenticate/sign_in" method="POST">
          <label for="email">Email</label>
          <input id="email" type="email" placeholder="somebody@example.com" />
          <label for="password">Password</label>
          <input id="password" type="password" />
          <input type="submit" className="button" value="Login" />
          <p><Link to='/password/forgot'>Forgot your password?</Link></p>
        </form>
      </div>
    );
  }
}

export default Login;
