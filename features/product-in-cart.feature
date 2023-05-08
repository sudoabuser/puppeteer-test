Feature: Make a failure payment
    Suppose a product is already added in cart, proceed to payment and get the error message at the end.

  Background: Add product to cart
    Given Bob is on the listing page
    And Bob selects a product
    And Bob selects the size and color of the product
    And Bob adds the product in the cart

  @loginRequired @emptyCart @demo @addItemToCart
  Scenario: Navigate to cart
    Given Bob has a product in the cart
    When Bob navigates to the cart
    Then Bob should see the cart page

  @loginRequired @demo
  Scenario: Navigate to payment
    Given Bob is on the cart page
    When Bob clicks the payment button
    Then Bob should see the payment page

  Scenario: Make an unsuccessfull payment
    Given Bob is on the payment page
    When Bob fills out the payment form
    And Bob clicks the payment button
    Then Bob should see the payment failure page