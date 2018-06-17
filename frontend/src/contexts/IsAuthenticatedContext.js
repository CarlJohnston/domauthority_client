import React from 'react';

const IsAuthenticatedContext = React.createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export default IsAuthenticatedContext;
