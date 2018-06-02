import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Forgot from '../Forgot/Forgot';
import Confirmed from '../Confirmed/Confirmed';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';

import withCurrentUser from '../hocs/withCurrentUser';

class Layout extends Component {
  render() {
    return (
      <div>
        <Header {...this.props} />

        <div className="grid-container">
          <Route exact path='/' component={Home} />

          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />

          <Route path='/password/forgot' component={Forgot} />

          <Route path='/authenticate/confirmed' component={Confirmed} />

          <Route path='/users/:id' component={Profile} />
        </div>

        <Footer {...this.props }/>
      </div>
    );
  }
}

export default withCurrentUser(Layout);
