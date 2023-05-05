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

Before({ tags: '@login-required' }, async () => {
    await ppt.page.goto('https://www.modanisa.com/membership/login/?return=%2F');
    await ppt.page.click('.select-email');
    await ppt.page.click('#email');
    await ppt.page.keyboard.type('modanisatest0@gmail.com');
    await ppt.page.click('#password');
    await ppt.page.keyboard.type('Test12345-');
    await ppt.page.click('.confirm');
})

module.exports = ppt;