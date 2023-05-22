const { Given, When, Then, setDefaultTimeout } = require("@cucumber/cucumber");
const assert = require("assert");
const ppt = require("./hooks");
setDefaultTimeout(30000);

// Check if the basket counter = 0
Given("Bob has a product in the cart", async () => {
  await ppt.page.waitForTimeout(4000)
  let basketCounter = await ppt.page.evaluate(() => {
    return document.querySelector(".inner").childElementCount;
  });

  // returns the child element (product) count of the cart on top-right corner
  console.log('\nThere %s %d item%s in the cart', basketCounter === 1 ? 'is' : 'are', basketCounter, basketCounter === 1 ? '' : 's');

  try {
    let emptyBasket = 0;
    assert.notStrictEqual(basketCounter, emptyBasket);
  } catch (error) {
    throw new Error(
      "Item count in the cart is away from the desired value!"
    );
  }
});

When("Bob navigates to the cart", async () => {  //problem // can't click!!
  const cart = ppt.page.$('#cart')
  await ppt.page.$eval((el) => {
    return el.click
    
  }, cart)
  await ppt.page.click('#cart', { waitUntil: "domcontentloaded" });
});

Then("Bob should see the cart page", async () => {
  await ppt.page.waitForNavigation({ waitUntil: "domcontentloaded" });
  const basketItemCount = await ppt.page.evaluate(() => {
    return document.querySelector("#basketList-list").childElementCount; // does basket list have child (item) in it?
  });

  assert.notStrictEqual(basketItemCount, 0); // there must be product(s) in the cart.
});
