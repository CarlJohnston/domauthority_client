import React from 'react';


const CurrentUserContext = React.createContext({
  currentUser: {
    name: undefined,
    username: undefined,
  },
  setCurrentUser: (data) => {},
  clearCurrentUser: () => {},
});

export default CurrentUserContext;
