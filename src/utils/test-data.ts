export interface User {
  username: string;
  password: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export const TestData = {
  validUser: {
    username: 'testuser',
    password: 'password123',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
  },

  invalidUser: {
    username: 'invaliduser',
    password: 'wrongpassword',
  },

  lockedUser: {
    username: 'lockeduser',
    password: 'password123',
  },
};

export interface TestEnvironment {
  baseUrl: string;
  apiBaseUrl: string;
  timeout: number;
  retries: number;
  headless: boolean;
}

export const getTestEnvironment = (): TestEnvironment => ({
  baseUrl: process.env.BASE_URL || 'https://example.com',
  apiBaseUrl: process.env.API_BASE_URL || 'https://api.example.com',
  timeout: parseInt(process.env.TEST_TIMEOUT || '10000'),
  retries: parseInt(process.env.TEST_RETRIES || '2'),
  headless: process.env.HEADLESS === 'true',
});
