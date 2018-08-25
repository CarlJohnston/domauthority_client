// @flow
import React, { Component } from 'react';
import 'promise-polyfill';
import PNotify from 'pnotify/dist/umd/PNotify';
import $ from 'jquery';
import Modal from 'react-modal';

import 'foundation-sites/dist/css/foundation.min.css';
import 'pnotify/dist/PNotifyBrightTheme.css';

import 'foundation-icons/foundation-icons.css';

import './PNotify.css';

import Main from 'components/Main/Main';

window.$ = window.jQuery = $;
require('foundation-sites');

PNotify.defaults = Object.assign(PNotify.defaults, {
  addClass: 'stack-bar-bottom',
  width: '70%',
  stack: Object.assign(PNotify.defaults.stack, {
    dir1: 'up',
    firstpos1: 0,
    spacing1: 0,
  }),
  delay: 2000,
});

Modal.setAppElement('#root');
Modal.defaultStyles = Object.assign(Modal.defaultStyles, {
  content: Object.assign(Modal.defaultStyles.content, {
    borderRadius: '0px',
    top: '100px',
    right: '100px',
    bottom: '100px',
    left: '100px',
  }),
});


type Props = {};

class App extends Component<Props> {
  render() {
    return (
      // $FlowFixMe: React Flow typings are not yet updated to React 16.3
      <React.StrictMode>
        <Main />
      </React.StrictMode>
    );
  }
}

export default App;
