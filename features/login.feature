Feature: SauceDemo Login
  As a user of SauceDemo
  I want to login to the application
  So that I can access the products page and make purchases

  Background:
    Given I am on the SauceDemo login page

  @login @smoke
  Scenario: Successful login with valid credentials
    When I enter "STANDARD_USER" on "username" field
    And I enter "STANDARD_PASSWORD" on "password" field
    And I click "login" button
    Then I should be redirected to "inventory" page
    And I should see the products title

  @login
  Scenario: Failed login with invalid credentials
    When I enter "INVALID_USER" on "username" field
    And I enter "INVALID_PASSWORD" on "password" field
    And I click "login" button
    Then I should see an error message
    And I should remain on the login page

  @login
  Scenario: Login with empty credentials
    When I leave username and password fields empty
    And I click "login" button
    Then I should see an error message
    And I should remain on the login page

  @login
  Scenario: Login with locked account
    When I enter "LOCKED_USER" on "username" field
    And I enter "STANDARD_PASSWORD" on "password" field
    And I click "login" button
    Then I should see an authentication error message
    And I should remain on the login page

  @login
  Scenario: Successful login with problem user
    When I enter "PROBLEM_USER" on "username" field
    And I enter "STANDARD_PASSWORD" on "password" field
    And I click "login" button
    Then I should be redirected to "inventory" page
    And I should see the products title
