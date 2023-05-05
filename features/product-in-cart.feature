Feature: Make a failure payment

    Suppose a product is already added in cart, proceed to payment and get the error message at the end.

    Background: Product added to cart
        Given Bob is on the homepage
        And Bob clicks on a banner
        And Bob selects a product
        And Bob selects the size and color of the product
        And Bob adds the product in the cart

    @login 
    Scenario: Navigate to cart
        Given Bob has a product in the cart
        When Bob navigates to the cart
        Then Bob should see the cart page

# @login
# Scenario: Navigate to sign in page
#     Given Bob is on the cart page
#     When Bob clicks on payment button
#     Then Bob should see the sign in page

# @login
# Scenario: Navigate to address page
#     Given Bob is on the sign in page
#     When Bob clicks on the continue without registering
#     Then Bob should see the address page

# @login
# Scenario: Navigate to payment page
#     Given Bob is on the address page
#     When Bob fills out the address information
#     And Bob clicks to the save button
#     Then Bob should see the checkout page

# @login
# Scenario: Make payment
#     Given Bob is on the checkout page
#     When Bob makes the fills the payment information
#     And Bob clicks to the complete order button
#     Then Bob should see the payment failure message