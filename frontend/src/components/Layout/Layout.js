// @flow

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import Login from 'components/NewLogin/NewLogin';
import Register from 'components/Register/Register';
import Forgot from 'components/Forgot/Forgot';
import Confirmed from 'components/Confirmed/Confirmed';
import Home from 'components/Home/Home';
import Profile from 'components/Profile/Profile';
import Settings from 'components/Settings/Settings';
import AnalyzeContainer from 'components/containers/AnalyzeContainer';
import SitesContainer from 'components/containers/SitesContainer';

import withCurrentUser from 'components/hocs/withCurrentUser';

import AuthenticatedRoute from 'components/routes/AuthenticatedRoute';
import NotAuthenticatedRoute from 'components/routes/NotAuthenticatedRoute';

import './Layout.css';


type Props = {
};

class Layout extends Component<Props> {
  render() {
    return (
      <div>
        <Header {...this.props} />

        <Switch>
          <Route exact path='/' component={Home} />

          <div id='content' className='grid-container'>
            <NotAuthenticatedRoute path='/login' component={Login} />
            <NotAuthenticatedRoute path='/register' component={Register} />

            <Route path='/password/forgot' component={Forgot} />
            <Route path='/auth/confirmed' component={Confirmed} />

            <Route path='/users/:id' component={Profile} />
            <AuthenticatedRoute path='/settings' component={Settings} />

            <AuthenticatedRoute path='/sites' component={SitesContainer} />
            <AuthenticatedRoute path='/analyze' component={AnalyzeContainer} />
          </div>
        </Switch>

        <Footer {...this.props} />
      </div>
    );
  }
}

export default withCurrentUser(Layout);
