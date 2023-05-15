const { Given, When, Then, setDefaultTimeout } = require("@cucumber/cucumber");
const assert = require("assert");
const ppt = require("./hooks");
setDefaultTimeout(20000);

Given("Bob is on the payment page", async () => {
    await ppt.page.goto('https://m.modanisa.com/checkout/?client_username=modanisa')
});

When("Bob fills out the payment form", async () => {
    await ppt.page.type('#checkoutAddress-cardOwnerNameInput', 'testing testing')
    await ppt.page.type('#checkoutAddress-cardNumberInput', '5487933072677662')

    // select the month april ---- THIS MAY CAUSE PROBLEM KIYAM BE CAREFUL!!! ----
    await ppt.page.evaluate((select) => {
        const monthApril = document.querySelector('#checkoutAddress-cardExpireDateMonthInput').options[4]
        select.value = monthApril.value;
    })

    // select the year 2028
    await ppt.page.evaluate((select) => {
        const year2028 = document.querySelector('#checkoutAddress-cardExpireDateYearInput').options[6]
        select.value = year2028.value;
    })

    // type the CVV
    await ppt.page.type('#checkoutAddress-cardSecurityCodeInput', '910')

    // unselect the option 'Daha kolay alışveriş için kart bilgilerimi kaydet'
    await ppt.page.click('div.checkoutAddress-formController:nth-child(4) > div:nth-child(1) > label:nth-child(2) > div:nth-child(1)')

    // select the selling promise
    await ppt.page.click('div.checkoutAddress-formController-isCheckbox:nth-child(2) > div:nth-child(1) > label:nth-child(2) > div:nth-child(1)')
})

When("Bob clicks the checkout button", async () => {
    await ppt.page.waitForSelector('.checkoutSinglePageFooter-button')
    await ppt.page.click('.checkoutSinglePageFooter-button')
})

Then("Bob should see the payment page", async () => {
    await ppt.page.waitForNavigation({ waitUntil: 'domcontentloaded' })
    const url = await ppt.page.url();
    assert.strictEqual(url, 'https://m.modanisa.com/checkout/?client_username=modanisa')
})