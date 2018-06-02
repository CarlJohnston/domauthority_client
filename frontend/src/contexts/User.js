import React from 'react';

const CurrentUser = React.createContext({
  currentUser: {
    uid: null,
    name: null,
    username: null,
    accessToken: null,
    client: null,
  },
  setCurrentUser: (data) => {},
});

export default CurrentUser;
