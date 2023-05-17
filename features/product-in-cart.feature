Feature: Make a failure payment
  Suppose a product is already added in cart, proceed to payment and get the error message at the end.

  Background: login to test account
    Given Bob is on the login page
    And Bob fills out his login information
    And Bob clicks on login button
    And Bob should see the modanisa homepage

  @emptyCart @demo
  Scenario: Navigate to cart
    Given Bob has a product in the cart
    When Bob navigates to the cart
    Then Bob should see the cart page

  @demo
  Scenario: Navigate to payment
    Given Bob is on the cart page
    When Bob clicks the payment button
    Then Bob should see the payment page
  @demo
  Scenario: Make an unsuccessful payment
    Given Bob is on the payment page
    And Bob fills out the payment form
    When Bob clicks the checkout button
    Then Bob should see the payment error