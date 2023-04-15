const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const ppt = require('./hooks');
const bannerHref = require('./click-on-banner');

//initialize a variable to store href of the clicked product for double-checking the Then part.
let productDetailHref;

Given('Bob is on the listing page', async () => {
    await ppt.page.goto(bannerHref);
});

When('Bob selects a product', async () => {
    await page.evaluate(() => {
        const element = document.evaluate('/html/body/div[3]/div[7]/div[1]/div/div/div[3]/div[1]/div[1]/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        //I used xpath, since it was more convenient in two ways: first, this is shorter, second, it wasn't working properly.
        element.click();
      });      
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

