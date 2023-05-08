const { Before, After } = require("@cucumber/cucumber");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin()); // modanisa.com does not allow everyone to test their website. this is for creating a stealth web agent.
const ppt = {};

Before(async () => {
  ppt.browser = await puppeteer.launch({
    headless: false,
  });
  ppt.pages = await ppt.browser.pages();
  ppt.page = ppt.pages[0];
}); // this is for preventing the browser from opening two tabs at the same time.

After(async () => {
  await ppt.browser.close();
});

// login infos
Before({ tags: "@loginRequired" }, async () => {
  await ppt.page.goto("https://www.modanisa.com/membership/login/?return=%2F");
  await ppt.page.click(".select-email");
  await ppt.page.click("#email");
  await ppt.page.keyboard.type("modanisatest0@gmail.com");
  await ppt.page.click("#password");
  await ppt.page.keyboard.type("Test12345-");
  await ppt.page.click(".confirm");
});

// add a product in cart. this is just a replication of scenarios I've implemented without the cucumber expressions
Before({ tags: "@addItemToCart" }, async () => {
  await ppt.page.goto("https://www.modanisa.com/harca-kazan.list", {
    waitUntil: "domcontentloaded",
  });

  let productId = await ppt.page.evaluate(() => {
    let product = document.querySelector('[data-testid="listing-product"]');
    return product ? product.getAttribute("data-product-id") : null; //take the product id
  });
  productIds.push(productId); //place it in an array
  await ppt.page.waitForSelector('[data-testid="listing-product"]', {
    waitUntil: "domcontentloaded",
  });
  await ppt.page.click('[data-testid="listing-product"]');
  console.log("\nclicked to product", productId);

  try {
    await ppt.page.waitForSelector('#other-color-products-container > h3')    
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
    } catch (error) {
        console.log('\nThis product only offers standard size and color selection')
    }

    await ppt.page.waitForSelector('.basket-button')
    await ppt.page.click('.basket-button')    // click the button 'Sepete Ekle'
    await ppt.page.waitForTimeout(3000)
});

// reduce item count to one to avoid stacking items during every test run.
After({ tags: "@emptyCart" }, async () => {
  try {
    const basketItemCount = await ppt.page.$eval("#basketList-list", (el) => {
      return el.childElementCount;
    });
    for (let i = 1; i < basketItemCount; i++) {
      await ppt.page.waitForSelector("#basketList-list");
      await ppt.page.click(".basketList-removeBasket");
      await ppt.page.waitForSelector("#basketList-removePopupRemoveButton");
      await ppt.page.click("#basketList-removePopupRemoveButton");
      console.log("\nOne item was removed");
    }
  } catch (error) {
    console.log("\nCart already contains one item");
  }
});

module.exports = ppt;
