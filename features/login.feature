Feature: SauceDemo Login
  As a user of SauceDemo
  I want to login to the application
  So that I can access the products page and make purchases

  Background:
    Given I am on the SauceDemo login page

  @login @smoke
  Scenario: Successful login with valid credentials
    When I enter "standard_user" as username
    And I enter "secret_sauce" as password
    And I click the login button
    Then I should be redirected to the inventory page
    And I should see the products title

  @login
  Scenario: Failed login with invalid credentials
    When I enter "invalid_user" as username
    And I enter "invalid_password" as password
    And I click the login button
    Then I should see an error message
    And I should remain on the login page

  @login
  Scenario: Login with empty credentials
    When I leave username and password fields empty
    And I click the login button
    Then I should see an error message
    And I should remain on the login page

  @login
  Scenario: Login with locked account
    When I enter "locked_out_user" as username
    And I enter "secret_sauce" as password
    And I click the login button
    Then I should see an account locked error message
    And I should remain on the login page

  @login
  Scenario: Successful login with problem user
    When I enter "problem_user" as username
    And I enter "secret_sauce" as password
    And I click the login button
    Then I should be redirected to the inventory page
    And I should see the products title
