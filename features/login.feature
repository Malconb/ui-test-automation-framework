Feature: User Login
  As a user
  I want to login to the application
  So that I can access my account and use the features

  Background:
    Given I am on the login page

  Scenario: Successful login with valid credentials
    When I enter valid username and password
    And I click the login button
    Then I should be redirected to the dashboard
    And I should see a welcome message

  Scenario: Failed login with invalid credentials
    When I enter invalid username and password
    And I click the login button
    Then I should see an error message
    And I should remain on the login page

  Scenario: Login with empty credentials
    When I leave username and password fields empty
    And I click the login button
    Then I should see validation errors
    And the login button should be disabled

  Scenario: Login with locked account
    When I enter credentials for a locked account
    And I click the login button
    Then I should see an account locked message
    And I should remain on the login page

  @retry
  Scenario: Login with network issues
    When I enter valid credentials
    And there is a network connection issue
    And I click the login button
    Then I should see a network error message
    And I should remain on the login page
