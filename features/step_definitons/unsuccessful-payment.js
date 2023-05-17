const { Given, When, Then, setDefaultTimeout } = require("@cucumber/cucumber");
const assert = require("assert");
const ppt = require("./hooks");
setDefaultTimeout(20000);

Given("Bob is on the payment page", async () => {
    await ppt.page.goto('https://modanisa.com/checkout/?client_username=modanisa', {waitUntil:'networkidle0'})
});

When("Bob fills out the payment form", async () => {
    await ppt.page.type('#checkoutAddress-cardOwnerNameInput', 'John Doe')
    await ppt.page.type('#checkoutAddress-cardNumberInput', '5528790000000008')

    // select the month april
    await ppt.page.select('#checkoutAddress-cardExpireDateMonthInput', '12');

    // await ppt.page.evaluate((select) => {
    //     const monthDecember = document.querySelector('#checkoutAddress-cardExpireDateMonthInput').options[12]
    //     select.value = monthDecember.value;
    // })

    // select the year 2030
    await ppt.page.select('#checkoutAddress-cardExpireDateMonthInput', '8');
    // await ppt.page.evaluate((select) => {
    //     const year2030 = document.querySelector('#checkoutAddress-cardExpireDateYearInput').options[8]
    //     select.value = year2030.value;
    // })

    // type the CVV
    await ppt.page.type('#checkoutAddress-cardSecurityCodeInput', '123')

    // unselect the option 'Daha kolay alışveriş için kart bilgilerimi kaydet'
    await ppt.page.click('div.checkoutAddress-formController:nth-child(4) > div:nth-child(1) > label:nth-child(2) > div:nth-child(1)')

    // select the selling promise
    await ppt.page.click('div.checkoutAddress-formController-isCheckbox:nth-child(2) > div:nth-child(1) > label:nth-child(2) > div:nth-child(1)')
})

When("Bob clicks the checkout button", async () => {
    await ppt.page.waitForSelector('.checkoutSinglePageFooter-button')
    await ppt.page.click('.checkoutSinglePageFooter-button')
})

Then("Bob should see the payment error", async () => {
    await ppt.page.waitForNavigation({ waitUntil: 'domcontentloaded' })
    const paymentError = await ppt.page.evaluate(() => {
        return document.querySelector('.checkoutPaymentTopError-errorText').textContent
    });
    assert.strictEqual(paymentError, 'Ödeme alınamadı')
})