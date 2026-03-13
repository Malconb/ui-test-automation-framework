Feature: SauceDemo Cart Management
  As a logged-in user of SauceDemo
  I want to interact with the shopping cart
  So that I can manage my selected items and proceed to checkout

  Background:
    Given I am on the SauceDemo login page
    When I enter "STANDARD_USER" on "username" field
    And I enter "STANDARD_PASSWORD" on "password" field
    And I click "login" button
    Then I should be redirected to "inventory" page
    And I should see text "Products" on page

  @cart @smoke
  Scenario: View cart with single item
    When I wait for element "Inventory list" to be visible
    And I add the first product to cart
    And I click on element ".shopping_cart_badge"
    Then I should see element "Cart list"
    And I should see element "Cart title"

  @cart @smoke
  Scenario: View cart with multiple items
    When I wait for element "Inventory list" to be visible
    And I add Sauce Labs Backpack to cart
    And I add Sauce Labs Bike Light to cart
    And I click on element ".shopping_cart_badge"
    Then I should see element "Cart list"
    And I should see element "Cart title"
    And I should see element "Checkout button"
    And I should see element "Continue shopping button"

  @cart @checkout
  Scenario: Proceed to checkout from cart
    When I wait for element "Inventory list" to be visible
    And I add Sauce Labs Backpack to cart
    And I click on element ".shopping_cart_badge"
    And I should see element "Cart list"
    And I click "checkout" button
    Then I should see element "Checkout form"
    And I should see element "Checkout title"
    And I should see element "First name field"
    And I should see element "Last name field"
    And I should see element "Postal code field"
    And I should see element "Continue button"
    And I should see element "Cancel button"

  @cart @navigation
  Scenario: Continue shopping from cart
    When I wait for element "Inventory list" to be visible
    And I add Sauce Labs Backpack to cart
    And I click on element ".shopping_cart_badge"
    And I should see element "Cart list"
    And I click "continue" button
    Then I should be redirected to "inventory" page
    And I should see text "Products" on page

  @cart @validation
  Scenario: Remove item from cart
    When I wait for element "Inventory list" to be visible
    And I add Sauce Labs Backpack to cart
    And I click on element ".shopping_cart_badge"
    And I should see element "Cart list"
    And I should see text "Sauce Labs Backpack" in element "Cart list"
    When I click on element "[data-test*=\"remove\"]"
    Then I should not see text "Sauce Labs Backpack" in element "Cart list"

  @cart @validation
  Scenario: Cart badge updates correctly
    When I wait for element "Inventory list" to be visible
    And I add Sauce Labs Backpack to cart
    Then I should see element "Shopping cart badge"
    And I should see text "1" in element "Shopping cart badge"
    When I add Sauce Labs Bike Light to cart
    Then I should see text "2" in element "Shopping cart badge"
    When I click on element ".shopping_cart_badge"
    And I click on element "[data-test*=\"remove\"]"
    And I click "continue" button
    Then I should see text "1" in element "Shopping cart badge"
