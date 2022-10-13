export const API_VERSIONS = {
  V1: '1',
  V2: '2',
  V3: '3',
};

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
    EXECUTE: 'execute'
  }
};
