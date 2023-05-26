const { Given, When, Then, setDefaultTimeout } = require("@cucumber/cucumber");
const assert = require("assert");
const ppt = require("./hooks");
const productIds = require("./select-a-product-listed");
setDefaultTimeout(10000);

let basketCounterSel
let productCounter
let productCounterDifference

Given("Bob is on the product detail page", async () => {
  await ppt.page.goto("https://www.modanisa.com", {
    waitUntil: "domcontentloaded",
  });    // nav to home page
  await ppt.page.focus("#search-input");
  await ppt.page.keyboard.type(productIds[1]);    // type the product id from the previous scenario
  await ppt.page.keyboard.type(String.fromCharCode(13));    // press 'Enter', 13 is the ASCII code of the 'Enter' key
});

When("Bob selects the size and color of the product", async () => {
  // some products don't have the size and color properties, they only have standard option.
  // so, try selecting the size and color, if not available, just add it to cart.

  await ppt.page.waitForSelector("#other-color-products-container > h3");
  await ppt.page.click("#other-color-products-container > a:nth-child(2)");    // select the first color, since there may not be a second one
  const selectedColor = await ppt.page.evaluate(() => {
    const productColor = document.querySelector(
      "#other-color-products-container > a:nth-child(2)"
    );
    return productColor.getAttribute("data-variant");    // fetch data-variant ,i.e. color, of the product
  });

  const sizeContainer = await ppt.page.$("#size-box-container", {
    waitUntil: "domcontentloaded"
  });    // wait until the size options are loaded;

  if (sizeContainer) {
    console.log('\nsize container available')
    const smallestSize = await ppt.page.$eval("#size-box-container > select", (select) => {
      // find the smallest size available
      const firstAvailableOption = select.querySelector(
        "option:not(.disable_selected):not([disabled])"
      );

      // select the option by changing the value of the select element
      select.value = firstAvailableOption.value;

      // trigger the 'change' event to simulate user interaction
      const changeEvent = new Event("change", { bubbles: true });
      select.dispatchEvent(changeEvent);
      return firstAvailableOption.innerHTML
    });
    console.log("\nselected size:", smallestSize);
    console.log("selected color:", selectedColor);
  }

  else {
    console.log('\nstandard size')
    console.log("selected color:", selectedColor);
  }
});

When("Bob adds the product in the cart", async () => {  
  basketCounterSel = await ppt.page.$(".count");
  productCounter = await ppt.page.evaluate((el) => {
    // returns the counter of the cart on top-right corner
    return el.innerHTML;
  }, basketCounterSel);

  await ppt.page.waitForSelector(".basket-button");
  await ppt.page.click(".basket-button");    // click the button 'Sepete Ekle'

  let productCounterNew = await ppt.page.evaluate((el) => {
    // returns the new counter of the cart on top-right corner, after adding the item to the cart.
    return el.innerHTML;
  }, basketCounterSel);

  productCounterDifference = productCounterNew - productCounter

  if(productCounterDifference = 1){    // check if the product is added to the cart
    console.log('\nProduct %d added to cart', productIds[1])
  }
});

Then("Bob should see the customized product in the cart", async () => {
  await ppt.page.waitForSelector(".count");
  // product counter should increase by 1
  try {
    assert.strictEqual(productCounterDifference, 1);
  } catch (error) {
    throw new Error(
      "There is no new item in the cart!",
      productCounter
    );
  }
});