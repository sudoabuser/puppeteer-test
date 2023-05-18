const { Given, When, Then, setDefaultTimeout } = require("@cucumber/cucumber");
const assert = require("assert");
const ppt = require("./hooks");
const productIds = require("./select-a-product-listed");
setDefaultTimeout(20000);

let selectedColor;

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
  selectedColor = await ppt.page.evaluate(() => {
    const productColor = document.querySelector(
      "#other-color-products-container > a:nth-child(2)"
    );
    return productColor.getAttribute("data-variant");    // fetch data-variant ,i.e. color, of the product
  });
  try {
    const sizeContainer = await ppt.page.waitForSelector("#size-box-container", {
      waitUntil: "domcontentloaded"
    });    // wait until the size options are loaded;

    if (sizeContainer) {
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

  } catch (error) {
    console.log(error)
    console.log("\nThis product only offers standard size and color selection");
  }
});

When("Bob adds the product in the cart", async () => {
  await ppt.page.waitForSelector(".basket-button");
  await ppt.page.click(".basket-button");    // click the button 'Sepete Ekle'
  await ppt.page.waitForTimeout(3000);
});

Then("Bob should see the customized product in the cart", async () => {
  let basketCounter = await ppt.page.$(".count");
  let productCounter = await ppt.page.evaluate((el) => {
    // returns the counter of the cart on top-right corner
    return el.innerHTML;
  }, basketCounter);

  try {
    let desiredProductCount = "1";
    assert.strictEqual(productCounter, desiredProductCount);
  } catch (error) {
    throw new Error(
      "Item count in the cart is away from the desired value!:",
      productCounter
    );
  }
});
