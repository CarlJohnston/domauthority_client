// @flow

type ParsedResponse = {
  body: {
    data: {
      username: string,
      name: string,
    },
    errors?: {
      [number]: string,
      full_messages?: Array<string>,
    },
  },
  headers: Headers,
};

export type {
  ParsedResponse,
};
