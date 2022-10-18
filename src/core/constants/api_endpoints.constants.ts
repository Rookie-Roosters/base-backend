export const API_VERSIONS = {
  V1: '1',
  V2: '2',
  V3: '3',
};

export const API_PARAMS = {
  BY_ID: ':id',
  BY_BANK: ':bank',
  BY_USER: ':user'
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
    EMPOLYEE: `${API_PARAMS.BY_ID}/empoyee/${API_PARAMS.BY_USER}`,
    BANKING: {
      BASE_PATH: 'banking',
      CREATE: `${API_PARAMS.BY_BANK}`,
      SIGN_IN: `sign-in/${API_PARAMS.BY_ID}`,
      EXPIRED: `expired/${API_PARAMS.BY_ID}`,
      ACCOUNTS: `accounts/${API_PARAMS.BY_ID}`,
      MOVEMENTS: `movements/${API_PARAMS.BY_ID}`,
      RECIPIENTS: `recipients/${API_PARAMS.BY_ID}`,
      TRANSFER: `transfer/${API_PARAMS.BY_ID}`,
    },
  },
  CHATS: {
    BASE_PATH: 'chats',
    BY_ID: 'id',
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
  BANKS: {
    BASE_PATH: 'banks',
    LOG_IN: 'log-in',
  }
};
