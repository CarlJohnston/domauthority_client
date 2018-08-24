// @flow
import React, { Component } from 'react';
import 'promise-polyfill';
import PNotify from 'pnotify/dist/umd/PNotify';
import $ from 'jquery';
import Modal from 'react-modal';

import 'foundation-sites/dist/css/foundation.min.css';
import 'pnotify/dist/PNotifyBrightTheme.css';

import 'foundation-icons/foundation-icons.css';

import Main from 'components/Main/Main';

window.$ = window.jQuery = $;
require('foundation-sites');

PNotify.defaults.stack.dir1 = 'up';

Modal.setAppElement('#root');


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
