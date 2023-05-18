Feature: Add a product in cart
  Visit modanisa and add a product in cart, then log in to keep the product in cart

  Scenario: Navigate to the homepage
    Given Bob is on the internet
    When Bob goes to www.modanisa.com
    Then Bob should see the modanisa homepage

  Scenario: Click on a banner
    Given Bob is on the homepage
    When Bob clicks on a banner
    Then Bob should be redirected to the associated listing page

  Scenario: Select a product from the listing page
    Given Bob is on the listing page
    When Bob selects a product
    Then Bob should see the product detail page
  @login
  Scenario: Select the size and color of a product
    Given Bob is on the product detail page
    And Bob selects the size and color of the product
    When Bob adds the product in the cart
    Then Bob should see the customized product in the cart