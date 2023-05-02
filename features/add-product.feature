Feature: Add a product in cart

    Visit modanisa and add a product in cart

    Scenario: Navigate to the homepage
        Given Bob is on the internet
        When Bob goes to www.modanisa.com
        Then Bob should see the modanisa homepage
    
    Scenario: Click on a banner
        Given Bob is on the homepage
        When Bob clicks on a banner
        Then Bob should be redirected to the associated listing page
    @demo
    Scenario: Select a product from the listing page
        Given Bob is on the listing page
        When Bob selects a product
        Then Bob should see the product detail page
    @demo
    Scenario: Select the size and color of a product
        Given Bob is on the product detail page
        When Bob selects the size and color of the product
        And Bob adds the product in the cart
        Then Bob should see the customized product in the cart

# Scenario: Navigate to cart
#     Given Bob has a product in the cart
#     When Bob navigates to the cart
#     Then Bob should see the cart page

# Scenario: Navigate to sign in page
#     Given Bob is on the cart page
#     When Bob clicks on payment button
#     Then Bob should see the sign in page

# Scenario: Navigate to address page
#     Given Bob is on the sign in page
#     When Bob clicks on the continue without registering
#     Then Bob should see the address page

# Scenario: Navigate to payment page
#     Given Bob is on the address page
#     When Bob fills out the address information
#     And Bob clicks to the save button
#     Then Bob should see the checkout page

# Scenario: Make payment
#     Given Bob is on the checkout page
#     When Bob makes the fills the payment information
#     And Bob clicks to the complete order button
#     Then Bob should see the payment failure message