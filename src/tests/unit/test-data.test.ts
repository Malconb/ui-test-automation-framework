import { expect } from 'chai';
import { TestData, getTestEnvironment } from '../../utils/test-data';

describe('Test Data Utilities', () => {
  describe('TestData', () => {
    it('should contain valid user data', () => {
      const validUser = TestData.validUser;
      
      expect(validUser).to.have.property('username');
      expect(validUser).to.have.property('password');
      expect(validUser).to.have.property('email');
      expect(validUser).to.have.property('firstName');
      expect(validUser).to.have.property('lastName');
      
      expect(validUser.username).to.be.a('string');
      expect(validUser.password).to.be.a('string');
      expect(validUser.email).to.be.a('string');
      expect(validUser.firstName).to.be.a('string');
      expect(validUser.lastName).to.be.a('string');
    });

    it('should contain invalid user data', () => {
      const invalidUser = TestData.invalidUser;
      
      expect(invalidUser).to.have.property('username');
      expect(invalidUser).to.have.property('password');
      
      expect(invalidUser.username).to.be.a('string');
      expect(invalidUser.password).to.be.a('string');
    });

    it('should contain locked user data', () => {
      const lockedUser = TestData.lockedUser;
      
      expect(lockedUser).to.have.property('username');
      expect(lockedUser).to.have.property('password');
      
      expect(lockedUser.username).to.be.a('string');
      expect(lockedUser.password).to.be.a('string');
    });
  });

  describe('getTestEnvironment', () => {
    it('should return test environment configuration', () => {
      const env = getTestEnvironment();
      
      expect(env).to.have.property('baseUrl');
      expect(env).to.have.property('apiBaseUrl');
      expect(env).to.have.property('timeout');
      expect(env).to.have.property('retries');
      expect(env).to.have.property('headless');
      
      expect(env.baseUrl).to.be.a('string');
      expect(env.apiBaseUrl).to.be.a('string');
      expect(env.timeout).to.be.a('number');
      expect(env.retries).to.be.a('number');
      expect(env.headless).to.be.a('boolean');
    });

    it('should use default values when environment variables are not set', () => {
      // Clear environment variables
      const originalBaseUrl = process.env.BASE_URL;
      const originalApiBaseUrl = process.env.API_BASE_URL;
      const originalTimeout = process.env.TEST_TIMEOUT;
      const originalRetries = process.env.TEST_RETRIES;
      const originalHeadless = process.env.HEADLESS;
      
      delete process.env.BASE_URL;
      delete process.env.API_BASE_URL;
      delete process.env.TEST_TIMEOUT;
      delete process.env.TEST_RETRIES;
      delete process.env.HEADLESS;
      
      const env = getTestEnvironment();
      
      expect(env.baseUrl).to.equal('https://example.com');
      expect(env.apiBaseUrl).to.equal('https://api.example.com');
      expect(env.timeout).to.equal(10000);
      expect(env.retries).to.equal(2);
      expect(env.headless).to.be.false;
      
      // Restore environment variables
      if (originalBaseUrl) process.env.BASE_URL = originalBaseUrl;
      if (originalApiBaseUrl) process.env.API_BASE_URL = originalApiBaseUrl;
      if (originalTimeout) process.env.TEST_TIMEOUT = originalTimeout;
      if (originalRetries) process.env.TEST_RETRIES = originalRetries;
      if (originalHeadless) process.env.HEADLESS = originalHeadless;
    });
  });
});
