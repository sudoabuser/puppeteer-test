const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const ppt = require('./hooks');
const productIds = require('./select-a-product-listed');


Given('Bob is on the product detail page', async () => {
    await ppt.page.goto('https://www.modanisa.com', { waitUntil: 'domcontentloaded' });    //nav to home page
    await ppt.page.focus('#search-input');
    await ppt.page.keyboard.type(productIds[1]);    //type the product id from the previous scenario
    await ppt.page.keyboard.type(String.fromCharCode(13));  //press 'Enter', 13 is the ASCII code of the 'Enter' key
    await ppt.page.waitForSelector('#other-color-products-container > h3')
})

When('Bob selects the size and color of the product', async () => {
    await ppt.page.click('#other-color-products-container > a:nth-child(2)')    //select the first color, since there may not be a second one
    await ppt.page.waitForSelector('#size-box-container', { waitUntil: 'domcontentloaded' });
    await ppt.page.click('#size-box-container')    //click size container
    await ppt.page.waitForTimeout(2000)
    // await ppt.page.keyboard.press('ArrowDown');
    // await ppt.page.keyboard.type(String.fromCharCode(13));
    await ppt.page.evaluate(() => {
        const smallestSize = document.querySelector('#size-box-container > select > option:last-child')
        return smallestSize.click()
    })    //select the smallest size
    await ppt.page.waitForTimeout(5000)
})