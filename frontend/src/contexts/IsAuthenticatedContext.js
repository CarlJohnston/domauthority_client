import React from 'react';

const IsAuthenticatedContext = React.createContext({
  setIsAuthenticated: () => {},
});

export default IsAuthenticatedContext;
