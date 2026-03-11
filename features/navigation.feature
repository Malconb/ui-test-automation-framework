Feature: Application Navigation
  As a user
  I want to navigate through different sections of the application
  So that I can access various features and information

  Background:
    Given I am logged in to the application

  Scenario: Navigate to dashboard
    When I click on the dashboard link
    Then I should be on the dashboard page
    And I should see the dashboard title

  Scenario: Navigate to profile page
    When I click on the profile link
    Then I should be on the profile page
    And I should see my profile information

  Scenario: Navigate to settings page
    When I click on the settings link
    Then I should be on the settings page
    And I should see the settings options

  Scenario: Navigate using browser back button
    When I navigate to the profile page
    And I click the browser back button
    Then I should return to the dashboard page

  Scenario: Navigate using breadcrumbs
    When I navigate to the settings page
    And I click on the dashboard breadcrumb
    Then I should return to the dashboard page

  Scenario: Mobile navigation
    When I am using a mobile device
    And I click the mobile menu toggle
    Then I should see the mobile navigation menu
    And I should be able to navigate to different sections
