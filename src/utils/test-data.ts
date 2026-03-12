import { TestConfig } from '../config/test-config';

export interface User {
  username: string;
  password: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export const TestData = {
  // Valid user credentials from environment
  validUser: {
    username: TestConfig.credentials.standardUser,
    password: TestConfig.credentials.standardPassword,
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
  },

  // Invalid user credentials from environment
  invalidUser: {
    username: TestConfig.credentials.invalidUser,
    password: TestConfig.credentials.invalidPassword,
  },

  // Locked user credentials from environment
  lockedUser: {
    username: TestConfig.credentials.lockedUser,
    password: TestConfig.credentials.standardPassword,
  },

  // Problem user credentials from environment
  problemUser: {
    username: TestConfig.credentials.problemUser,
    password: TestConfig.credentials.standardPassword,
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
  baseUrl: TestConfig.baseUrl,
  apiBaseUrl: process.env.API_BASE_URL || 'https://api.example.com',
  timeout: parseInt(process.env.TEST_TIMEOUT || '10000'),
  retries: parseInt(process.env.TEST_RETRIES || '2'),
  headless: process.env.HEADLESS === 'true',
});
