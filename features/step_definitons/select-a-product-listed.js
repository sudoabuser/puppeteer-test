const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const ppt = require('./hooks');

let productIds = [];

Given('Bob is on the listing page', async () => {
    await ppt.page.goto('https://www.modanisa.com/harca-kazan.list', { waitUntil: 'domcontentloaded' }); //to hinder timeout error, just wait for domcontent
});

When('Bob selects a product', async () => {
    let productId = await ppt.page.evaluate(() => {
        let product = document.querySelector('[data-testid="listing-product"]');
        return product ? product.getAttribute('data-product-id') : null;  //take the product id
    })
    productIds.push(productId)  //place it in an array
    await ppt.page.waitForSelector('[data-testid="listing-product"]', { waitUntil: 'domcontentloaded' })
    await ppt.page.click('[data-testid="listing-product"]');
    console.log('\nclicked to product', productId)
});

Then('Bob should see the product detail page', async () => {
    await ppt.page.waitForSelector('#productData')
    const currentProductId = await ppt.page.evaluate(() => {
        let product = document.querySelector('#productData')
        return product ? product.getAttribute('data-product-id') : null;    //take the directed products' id
    })
    productIds.push(currentProductId) //place it in the same array we've created before

    try {
        assert.strictEqual(productIds[0], productIds[1])   //check if they are the same to verify the directed product
    } catch (error) {
        throw new Error('Bob got misdirected into a wrong product!:', productIds[1])  //if the id's not equal, throw an error with the directed product id
    }
});

module.exports = productIds