// @flow

type CurrentUser = {
  uid?: string,
  name?: string,
  username?: string,
  accessToken?: string,
  client?: string,
};

type CurrentUserContext = {
  currentUser: CurrentUser,
  setCurrentUser: (CurrentUser) => void,
  clearCurrentUser: () => void,
};

export type {
  CurrentUserContext,
  CurrentUser,
};
