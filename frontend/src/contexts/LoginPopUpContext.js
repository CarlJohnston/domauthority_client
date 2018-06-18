import React from 'react';

const LoginPopUpContext = React.createContext({
  loginPopUp: false,
  setLoginPopUp: () => {},
});

export default LoginPopUpContext;
