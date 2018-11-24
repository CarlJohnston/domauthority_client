import React from 'react';
import { mount } from 'enzyme';
import { Router } from 'react-router-dom';
import Sinon from 'sinon';
import createHistory from "history/createBrowserHistory";

import Login from 'components/NewLogin/NewLogin';

import CurrentUserContext from 'contexts/CurrentUserContext';

describe('login', () => {
  let xhr;
  let requests = [];
  beforeAll(() => {
    xhr = Sinon.useFakeXMLHttpRequest();
    xhr.onCreate = function (xhr) {
      requests.push(xhr);
    };
  });

  let component;
  let history;
  let createComponent = (props, path) => {
    history = createHistory();
    path = path || '/';
    history.push(path);

    if (component) {
      component.unmount();
    }

    let currentUser = {
      currentUser: {
        username: null,
        name: null,
      },
      setCurrentUser: () => {},
      clearCurrentUser: () => {},
    };
    component = mount(
      <Router history={history}>
        <CurrentUserContext.Provider value={currentUser}>
          <Login {...props} history={history} />
        </CurrentUserContext.Provider>
      </Router>
    );
  };

  afterEach(() => {
    if (component) {
      component.unmount();
    }
  });

  it('redirects to homepage after login success', (done) => {
    let initialPath = '/login';
    createComponent({}, initialPath);

    let form = component.find(Login).find('form');
    form.find('#email').instance().value = 'email@email.com';
    form.find('#password').instance().value = 'password';
    window.$(form.find('form').instance()).foundation('validateForm');

    requests[0].respond(
      200,
      {
        'Content-Type': 'application/json',
      },
      JSON.stringify({
        data: {
          username: 'username',
          name: 'name',
          uid: 'email@email.com',
        },
      })
    );

    let failed;
    setInterval(() => {
      failed = false;
      try {
        expect(component.find(Login).prop('history').location.pathname).toEqual('/');
      } catch (e) {
        failed = true;
      }

      if (!failed) {
        done();
      }
    });
  });
});
