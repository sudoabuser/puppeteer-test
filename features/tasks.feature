Feature: Visit and Pay

    This feature is for visiting a website and testing if the payment system is working properly

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
        And Bob adds the product in the chart
        # Then Bob should see the customized product in the chart

# Scenario: Navigate to the cart
#     Given Bob has a product in the cart
#     When Bob navigates to the cart
#     Then Bob should see the product in the cart

# Scenario: Navigate to the payment page
#     Given Bob is on the cart page
#     When Bob navigates to the payment page
#     Then Bob should see the payment form

# Scenario: Fill out payment information
#     Given Bob is on the payment page
#     When Bob fills out the payment information
#     Then Bob should see the payment confirmation page

# Scenario: Make payment
#     Given Bob is on the payment confirmation page
#     When Bob makes the payment
#     Then Bob should see the payment success message