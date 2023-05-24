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

After({ tags: "@reduceCart" }, async () => {
  try {
    const basketItemCount = await ppt.page.$eval("#basketList-list", (el) => {
      return el.childElementCount;
    });
    for (let i = 1; i < basketItemCount; i++) {
      await ppt.page.waitForSelector("#basketList-list");
      await ppt.page.click(".basketList-removeBasket");
      await ppt.page.waitForSelector("#basketList-removePopupRemoveButton");
      await ppt.page.click("#basketList-removePopupRemoveButton");
      console.log("\nOne item removed from basket");
    }
  } catch (error) {
    console.log("\nCart already contains one item");
  }
});

Before({ tags: "@login" }, async () => {
  await ppt.page.goto("https://www.modanisa.com/membership/login/?return=%2F", {waitUntil:'domcontentloaded'});
  await ppt.page.waitForSelector(".select-email");
  await ppt.page.click(".select-email");
  await ppt.page.click("#email");
  await ppt.page.keyboard.type("modanisatest0@gmail.com");
  await ppt.page.click("#password");
  await ppt.page.keyboard.type("Test12345-");
  await ppt.page.waitForSelector('.confirm')
  await ppt.page.$eval('.confirm', (el) =>{
      return el.click() 
  })
  await ppt.page.waitForNavigation({waitUntil:'domcontentloaded'});
});

module.exports = ppt;