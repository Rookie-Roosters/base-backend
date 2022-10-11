export const API_PARAMS = {
  BY_ID: ':id',
};

export const API_ENDPOINTS = {
  USERS: {
    BASE_PATH: 'users',
    BY_ID: API_PARAMS.BY_ID,
  },
  CHATS: {
    BASE_PATH: 'chats',
    BY_ID: API_PARAMS.BY_ID,
    SEND: 'send',
  },
};
