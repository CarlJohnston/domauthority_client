import React from 'react';


const CurrentUserContext = React.createContext({
  currentUser: {
    name: null,
    username: null,
  },
  setCurrentUser: (data) => {},
  clearCurrentUser: () => {},
});

export default CurrentUserContext;
