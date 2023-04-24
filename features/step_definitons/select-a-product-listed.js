const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const ppt = require('./hooks');
const { bannerHref } = require('./test-data');
const { setBannerHref } = require('./test-data');

//initialize a variable to store href of the clicked product for double-checking the "Then" part.
let productDetailHref;
console.log(bannerHref)

Given('Bob is on the listing page', async () => {
    console.log(bannerHref)
    await ppt.page.goto(bannerHref);
});

When('Bob selects a product', async () => {
    await ppt.page.evaluate(() => {
        const element = document.querySelector('[data-testid="listing-product-link"]')
        element.click();
    });
    productDetailHref = await ppt.page.evaluate(() => {
        let element = document.querySelector('[data-testid="listing-product-link"]')
        return element.getAttribute('href')
    })
    setBannerHref(productDetailHref)
});

Then('Bob should see the product detail page', async () => {

    const directedUrl = await ppt.page.url(); //get the url of the current page

    console.log('Banner href:', bannerHref);
    console.log('Directed URL:', directedUrl);

    try {
        assert.strictEqual(bannerHref, directedUrl);
    } catch (error) {
        throw new Error("Bob's lost!!.. He's floating the web.");
    }

});