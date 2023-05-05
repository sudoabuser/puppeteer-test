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