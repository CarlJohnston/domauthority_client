import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import Login from 'components/Login/Login';
import Register from 'components/Register/Register';
import Forgot from 'components/Forgot/Forgot';
import Confirmed from 'components/Confirmed/Confirmed';
import Home from 'components/Home/Home';
import Profile from 'components/Profile/Profile';

import withCurrentUser from 'components/hocs/withCurrentUser';

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
