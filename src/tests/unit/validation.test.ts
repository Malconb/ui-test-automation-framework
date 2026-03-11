import { expect } from 'chai';

describe('Validation Utilities', () => {
  describe('Email Validation', () => {
    const isValidEmail = (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    it('should validate correct email addresses', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.org',
        'user123@test-domain.com'
      ];

      validEmails.forEach(email => {
        expect(isValidEmail(email), `${email} should be valid`).to.be.true;
      });
    });

    it('should reject invalid email addresses', () => {
      const invalidEmails = [
        'invalid-email',
        '@example.com',
        'test@',
        'test.example.com',
        'test@.com',
        '',
        'test@domain.',
        'test@domain..com'
      ];

      invalidEmails.forEach(email => {
        expect(isValidEmail(email), `${email} should be invalid`).to.be.false;
      });
    });
  });

  describe('Password Validation', () => {
    const isStrongPassword = (password: string): boolean => {
      const minLength = 8;
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumbers = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      return password.length >= minLength && 
             hasUpperCase && 
             hasLowerCase && 
             hasNumbers && 
             hasSpecialChar;
    };

    it('should validate strong passwords', () => {
      const strongPasswords = [
        'StrongPass123!',
        'MyP@ssw0rd',
        'Test1234$',
        'SecurePass#1'
      ];

      strongPasswords.forEach(password => {
        expect(isStrongPassword(password), `${password} should be strong`).to.be.true;
      });
    });

    it('should reject weak passwords', () => {
      const weakPasswords = [
        'weak',
        'password',
        '12345678',
        'Password',
        'password123',
        'PASSWORD123!',
        'Pass1!',
        ''
      ];

      weakPasswords.forEach(password => {
        expect(isStrongPassword(password), `${password} should be weak`).to.be.false;
      });
    });
  });

  describe('URL Validation', () => {
    const isValidUrl = (url: string): boolean => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    };

    it('should validate correct URLs', () => {
      const validUrls = [
        'https://example.com',
        'http://localhost:3000',
        'https://subdomain.example.com/path',
        'https://example.com:8080/path?query=value',
        'ftp://files.example.com'
      ];

      validUrls.forEach(url => {
        expect(isValidUrl(url), `${url} should be valid`).to.be.true;
      });
    });

    it('should reject invalid URLs', () => {
      const invalidUrls = [
        'not-a-url',
        'example.com',
        'http://',
        'https://',
        '',
        '://example.com',
        'http://invalid domain.com'
      ];

      invalidUrls.forEach(url => {
        expect(isValidUrl(url), `${url} should be invalid`).to.be.false;
      });
    });
  });
});
