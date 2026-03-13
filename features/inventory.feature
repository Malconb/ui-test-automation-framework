Feature: SauceDemo Inventory Page
  As a logged-in user of SauceDemo
  I want to interact with the inventory page
  So that I can view products, add them to cart, and manage my shopping experience

  Background:
    Given I am on the SauceDemo login page
    When I enter "STANDARD_USER" on "username" field
    And I enter "STANDARD_PASSWORD" on "password" field
    And I click "login" button
    Then I should be redirected to "inventory" page
    And I should see text "Products" on page

  @inventory @smoke
  Scenario: View all available products
    When I wait for element "Inventory list" to be visible
    Then I should see element "Inventory list"
    And I should see element "Product title"
    And I should see element "Product items"
    And I should see element "Product names"
    And I should see element "Product prices"

  @inventory @smoke
  Scenario: Verify product count and basic information
    When I wait for element "Inventory list" to be visible
    Then I should see element "Inventory list"
    And I should see text "Products" in element "Product title"
    And I should see at least 6 product items
    And I should see product names for all items
    And I should see product prices for all items

  @inventory @cart
  Scenario: Add single product to cart
    When I wait for element "Inventory list" to be visible
    And I add the first product to cart
    Then I should see element "Shopping cart badge"
    And I should see text "1" in element "Shopping cart badge"

  @inventory @cart @outline
  Scenario Outline: Add multiple products to cart
    When I wait for element "Inventory list" to be visible
    And I add "<product_name>" to cart
    Then I should see element "Shopping cart badge"
    And I should see text "<cart_count>" in element "Shopping cart badge"

    Examples:
      | product_name             | cart_count |
      | Sauce Labs Backpack      | 1         |
      | Sauce Labs Bike Light     | 1         |
      | Sauce Labs Bolt T-Shirt   | 1         |

  @inventory @sort
  Scenario: Sort products by name A to Z
    When I wait for element "Inventory list" to be visible
    And I sort products by name A to Z
    Then I should see element "Inventory list"

  @inventory @sort
  Scenario: Sort products by price low to high
    When I wait for element "Inventory list" to be visible
    And I sort products by price low to high
    Then I should see element "Inventory list"

  @inventory @cart @smoke
  Scenario: Add multiple different products to cart sequentially
    When I wait for element "Inventory list" to be visible
    And I add Sauce Labs Backpack to cart
    And I add Sauce Labs Bike Light to cart
    And I add Sauce Labs Bolt T-Shirt to cart
    Then I should see element "Shopping cart badge"
    And I should see text "3" in element "Shopping cart badge"
