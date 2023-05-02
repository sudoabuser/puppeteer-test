const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const assert = require('assert');
const ppt = require('./hooks');
const productIds = require('./select-a-product-listed');
setDefaultTimeout(20000);

Given('Bob has a product in the cart', async () => {
    let basketCounter = await ppt.page.$('.count')
    let productCounter = await ppt.page.evaluate((el) => {    // returns the counter of the cart on top-right corner
        return el.innerHTML
    }, basketCounter)

    try {
        let desiredProductCount = '1'
        assert.strictEqual(productCounter, desiredProductCount)
    } catch (error) {
        throw new Error('Item count in the cart is away from the desired value!:', productCounter)
    }
})

When('Bob navigates to the cart', async () => {
});

Then('Bob should see the product in the cart', async () => {
});