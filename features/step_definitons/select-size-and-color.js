const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const assert = require('assert');
const ppt = require('./hooks');
const productIds = require('./select-a-product-listed');
setDefaultTimeout(20000);

let selectedSize;
let selectedColor;

Given('Bob is on the product detail page', async () => {
    await ppt.page.goto('https://www.modanisa.com', { waitUntil: 'domcontentloaded' });    // nav to home page
    await ppt.page.focus('#search-input');
    await ppt.page.keyboard.type(productIds[1]);    // type the product id from the previous scenario
    await ppt.page.keyboard.type(String.fromCharCode(13));  // press 'Enter', 13 is the ASCII code of the 'Enter' key
    await ppt.page.waitForSelector('#other-color-products-container > h3')
})

When('Bob selects the size and color of the product', async () => {
    await ppt.page.click('#other-color-products-container > a:nth-child(2)')    // select the first color, since there may not be a second one
    selectedColor = await ppt.page.evaluate(() => {    
        const productColor = document.querySelector('#other-color-products-container > a:nth-child(2)')
        return productColor.getAttribute('data-variant')    // fetch data-variant ,i.e. color, of the product
    })
    await ppt.page.waitForSelector('#size-box-container', { waitUntil: 'domcontentloaded' });    // wait until the size options are loaded
    await ppt.page.click('#size-box-container');

    const smallestSize = await ppt.page.$('#size-box-container > select option:not(.disable_selected, [disabled])')    // point to the smallest size except from the placeholder and disabled options
    await ppt.page.$eval('#size-box-container > select', (select) => {
        // find the smallest size available
        const firstAvailableOption = select.querySelector('option:not(.disable_selected):not([disabled])');
      
        // select the option by changing the value of the select element
        select.value = firstAvailableOption.value;
      
        // trigger the 'change' event to simulate user interaction
        const changeEvent = new Event('change', { bubbles: true });
        select.dispatchEvent(changeEvent);
      });
      await ppt.page.waitForTimeout(3000)

    selectedSize = await ppt.page.evaluate((el) => {
        const innerText = el.innerHTML;
        return innerText
    }, smallestSize)    // fetch the inner html of the selector (e.g. 42-44)

    console.log('\nselected size:', selectedSize)
    console.log('selected color:', selectedColor)
})

When('Bob adds the product in the cart', async () => {
    await ppt.page.waitForSelector('.basket-button')
    await ppt.page.click('.basket-button')    // click the button 'Sepete Ekle'
    await ppt.page.waitForTimeout(3000)
});

Then('Bob should see the customized product in the cart', async () => {
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
});