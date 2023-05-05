const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const assert = require('assert');
const ppt = require('./hooks');
setDefaultTimeout(20000);

// Checking if the basket counter == 1
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
    await ppt.page.waitForSelector('#cart');
    await ppt.page.$eval('#cart', element => {
        element.click()
    });
    await ppt.page.waitForSelector('#basketList-list')
});

Then('Bob should see the cart page', async () => {
    const basketItemCount = await ppt.page.evaluate(() => {
        return document.querySelector('#basketList-list').childElementCount    // does basket list have child (item) in it?
    })

    assert.notStrictEqual(basketItemCount, 0)    // there must be product(s) in the cart.
    await ppt.page.waitForTimeout(4000)
});