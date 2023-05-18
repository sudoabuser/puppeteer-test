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

   // Click on the month select
   await ppt.page.click('#checkoutAddress-cardExpireDateMonthInput');

   // Wait for the month options to be visible
   await ppt.page.waitForSelector('#checkoutAddress-cardExpireDateMonthInput option');
 
   // Select the desired month option
   await ppt.page.select('#checkoutAddress-cardExpireDateMonthInput', '12');
 
   // Click on the year select
   await ppt.page.click('#checkoutAddress-cardExpireDateYearInput');
 
   // Wait for the year options to be visible
   await ppt.page.waitForSelector('#checkoutAddress-cardExpireDateYearInput option');
 
   // Select the desired year option
   await ppt.page.select('#checkoutAddress-cardExpireDateYearInput', '2023');
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
    await ppt.page.waitForNavigation({ waitUntil: 'networkidle0' })
    await ppt.page.waitForSelector('.checkoutPaymentTopError-errorText')
    const paymentError = await ppt.page.evaluate(() => {
        return document.querySelector('.checkoutPaymentTopError-errorText').textContent
    });
    assert.strictEqual(paymentError, 'Ödeme alınamadı')
})