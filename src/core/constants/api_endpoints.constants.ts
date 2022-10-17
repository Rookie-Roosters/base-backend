export const API_VERSIONS = {
  V1: '1',
  V2: '2',
  V3: '3',
};

export const API_PARAMS = {
  BY_ID: ':id',
  BY_BANK: ':bank',
};

export const API_ENDPOINTS = {
  USERS: {
    BASE_PATH: 'users',
    BY_ID: API_PARAMS.BY_ID,
    SESSION: {
      BASE_PATH: 'session',
      LOG_IN: 'log-in',
      SIGN_UP: 'sign-up',
    },
  },
  COMPANIES: {
    BASE_PATH: 'companies',
    BY_ID: API_PARAMS.BY_ID,
    BANKING: {
      BASE_PATH: 'banking',
      SIGN_IN: `${API_PARAMS.BY_BANK}/sign-in`,
      VALIDATE_ACCOUNT: `${API_PARAMS.BY_BANK}/validate-account`,
      SIGN_OUT: `${API_PARAMS.BY_BANK}/sign-out`,
      REFRESH_TOKEN: `${API_PARAMS.BY_BANK}/refresh-token`,
      TRANSFER: `${API_PARAMS.BY_BANK}/transfer`,
      ACCOUNTS: `${API_PARAMS.BY_BANK}/accounts`,
      MOVEMENTS: `${API_PARAMS.BY_BANK}/movements`,
      RECIPIENTS: `${API_PARAMS.BY_BANK}/recipients`,
    },
  },
  CHATS: {
    BASE_PATH: 'chats',
    BY_ID: API_PARAMS.BY_ID,
    SEND: 'send',
  },
  CHATBOT: {
    BASE_PATH: 'chatbot',
    BY_ID: 'id',
    TOPICS: 'topics',
    QUESTION: 'question',
    ANSWER: 'answer',
    TRAIN: 'train',
  },
  AUTOMATION: {
    BASE_PATH: 'automation',
    BY_COMPANY_ID: 'company',
    BY_ID: 'id',
    EXECUTE: 'execute',
    DRAFT: 'draft',
  },
};
