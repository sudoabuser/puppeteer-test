const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const ppt = require('./hooks');

let productDetailHref;

Given('Bob is on the listing page', async () => {
    await ppt.page.goto('https://www.modanisa.com/harca-kazan.list', { waitUntil: 'domcontentloaded' });
});

When('Bob selects a product', async () => {
    productDetailHref = await ppt.page.evaluate(() => {
        let element = document.querySelector('[data-testid="listing-product-link"]')
        return element.getAttribute('href')
    })

    await ppt.page.evaluate(() => {
        let element = 'https://www.modanisa.com' + document.querySelector('[data-testid="listing-product-image"]:nth-child(1)') ///.html donderiyo o yuzden erisim reddediliyo
        console.log(element)
        element.click();
    });
    await ppt.page.waitForTimeout(3000)
});

Then('Bob should see the product detail page', async () => {
    const directedUrl = await ppt.page.url(); //get the url of the current page

    console.log('Product href:', productDetailHref);
    console.log('Directed URL:', directedUrl);

    try {
        assert.strictEqual(productDetailHref, directedUrl);
    } catch (error) {
        throw new Error("Bob's lost!!.. He's floating the web.");
    }

});
