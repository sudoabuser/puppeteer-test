const { Given, When, Then, setDefaultTimeout } = require("@cucumber/cucumber");
const assert = require("assert");
const ppt = require("./hooks");
setDefaultTimeout(20000);

Given("Bob is on the cart page", async () => {
  await ppt.page.goto('https://www.modanisa.com/basket/')
});

When("Bob clicks the payment button", async () => {
  await ppt.page.waitForSelector('.basketPage-buyButton')
  await ppt.page.click('.basketPage-buyButton')
})

Then("Bob should see the payment page", async () => {
  await ppt.page.waitForNavigation()
  const url = await ppt.page.url();
  assert.strictEqual(url, 'https://m.modanisa.com/checkout/?client_username=modanisa')
})
