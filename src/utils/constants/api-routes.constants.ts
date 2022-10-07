export const API_RESOURCES = {
  USERS: 'api/user',
  CHATS: 'api/chats',
};

export const DEFAULT_API_PATHS = {
  BY_ID: '_id',
};

export const API_ENDPOINTS = {
  USERS: {
    BASE_PATH: `/${API_RESOURCES.USERS}`,
  },
  CHATS: {
    BASE_PATH: `/${API_RESOURCES.CHATS}`,
    SEND: `send`,
  },
};
