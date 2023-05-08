const { Given, When, Then, setDefaultTimeout } = require("@cucumber/cucumber");
const assert = require("assert");
const ppt = require("./hooks");
setDefaultTimeout(20000);

// Check if the basket counter = 0
Given("Bob has a product in the cart", async () => {
  await ppt.page.waitForTimeout(4000)
  let basketCounter = await ppt.page.evaluate(() => {
    return document.querySelector(".inner").childElementCount;
  });

  // returns the child element (product) count of the cart on top-right corner
  
  console.log('\nThere are %d items in cart', basketCounter)
  
  try {
    let emptyBasket = 0;
    assert.notStrictEqual(basketCounter, emptyBasket);
  } catch (error) {
    throw new Error(
      "Item count in the cart is away from the desired value!"
    );
  }
});

When("Bob navigates to the cart", async () => {
  await ppt.page.goto('https://www.modanisa.com/basket/', {waitFor:'domcontentloaded'});
});

Then("Bob should see the cart page", async () => {
  const basketItemCount = await ppt.page.evaluate(() => {
    return document.querySelector("#basketList-list").childElementCount; // does basket list have child (item) in it?
  });

  assert.notStrictEqual(basketItemCount, 0); // there must be product(s) in the cart.
  await ppt.page.waitForTimeout(4000);
});
