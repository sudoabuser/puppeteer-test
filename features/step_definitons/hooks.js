const { Before, After } = require('@cucumber/cucumber');
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const ppt = {};


Before(async () => {
    ppt.browser = await puppeteer.launch({
        headless: false,

    });
    ppt.pages = await ppt.browser.pages();
    ppt.page = ppt.pages[0];
})

After(async () => {
    await ppt.browser.close();
})

module.exports = ppt;