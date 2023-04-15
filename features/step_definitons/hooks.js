const { Before, After } = require('@cucumber/cucumber');
const puppeteer = require('puppeteer');
const ppt = {};


Before(async () => {
    ppt.browser = await puppeteer.launch({
        headless: false,
        slowMo: 10   // this is for the 'scenario: click on banner'. otherwise it didn't fetch the subdomain of the url somehow.
    });
    ppt.pages = await ppt.browser.pages();
    ppt.page = ppt.pages[0];
})

After(async () => {
    await ppt.browser.close();
})

module.exports = ppt;