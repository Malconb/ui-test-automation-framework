Feature: SauceDemo Checkout Process
  As a logged-in user of SauceDemo
  I want to complete the checkout process
  So that I can purchase my selected items

  Background:
    Given I am on the SauceDemo login page
    When I enter "STANDARD_USER" on "username" field
    And I enter "STANDARD_PASSWORD" on "password" field
    And I click "login" button
    Then I should be redirected to "inventory" page
    And I should see text "Products" on page
    When I wait for element "Inventory list" to be visible
    And I add Sauce Labs Backpack to cart
    And I click on element ".shopping_cart_badge"
    And I should see element "Cart list"
    And I click "checkout" button

  @checkout @smoke
  Scenario: Complete checkout with valid information
    When I wait for element "Checkout form" to be visible
    And I fill checkout information with "John", "Doe", "12345"
    And I continue checkout
    Then I should see element "Checkout summary"
    And I should see element "Payment information"
    And I should see element "Shipping information"
    And I should see element "Item total"
    And I should see element "Tax"
    And I should see element "Total"
    And I should see element "Finish button"
    And I should see element "Cancel button"
    When I finish checkout
    Then I should see element "Complete header"
    And I should see element "Complete text"
    And I should see element "Back to products button"

  @checkout @validation
  Scenario: Verify checkout summary information
    When I wait for element "Checkout form" to be visible
    And I fill checkout information with "Jane", "Smith", "67890"
    And I continue checkout
    Then I should see element "Checkout summary"
    And I should see text "Payment Information" in element "Payment information"
    And I should see text "Shipping Information" in element "Shipping information"
    And I should see text "Item total:" in element "Item total"
    And I should see text "Tax:" in element "Tax"
    And I should see text "Total:" in element "Total"

  @checkout @validation
  Scenario: Cancel checkout from information page
    When I wait for element "Checkout form" to be visible
    And I cancel checkout
    Then I should see element "Cart list"
    And I should see element "Cart title"

  @checkout @validation
  Scenario: Cancel checkout from summary page
    When I wait for element "Checkout form" to be visible
    And I fill checkout information with "Test", "User", "11111"
    And I continue checkout
    And I should see element "Checkout summary"
    And I cancel checkout
    Then I should be redirected to "inventory" page
    And I should see text "Products" on page

  @checkout @navigation
  Scenario: Return to products after successful checkout
    When I wait for element "Checkout form" to be visible
    And I fill checkout information with "Alice", "Wonder", "22222"
    And I continue checkout
    And I should see element "Checkout summary"
    And I finish checkout
    And I should see element "Complete header"
    And I go back to products
    Then I should be redirected to "inventory" page
    And I should see text "Products" on page

  @checkout @validation
  Scenario: Verify order completion message
    When I wait for element "Checkout form" to be visible
    And I fill checkout information with "Bob", "Builder", "33333"
    And I continue checkout
    And I should see element "Checkout summary"
    And I finish checkout
    Then I should see text "Thank you for your order!" in element "Complete header"
    And I should see text "Your order has been dispatched" in element "Complete text"

  @checkout @outline
  Scenario Outline: Complete checkout with different user information
    When I wait for element "Checkout form" to be visible
    And I fill checkout information with "<first_name>", "<last_name>", "<postal_code>"
    And I continue checkout
    And I should see element "Checkout summary"
    And I finish checkout
    Then I should see element "Complete header"
    And I should see element "Back to products button"

    Examples:
      | first_name | last_name | postal_code |
      | Charlie    | Brown     | 44444       |
      | Diana     | Prince    | 55555       |
      | Eve       | Adams     | 66666       |
