// @flow

type CurrentUser = {
  name?: string,
  username?: string,
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
