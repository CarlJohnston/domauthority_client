import React from 'react';

const CurrentUserContext = React.createContext({
  currentUser: {
    uid: null,
    name: null,
    username: null,
    accessToken: null,
    client: null,
  },
  setCurrentUser: (data) => {},
  clearCurrentUser: () => {},
});

export default CurrentUserContext;
