const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const ppt = require('./hooks');
const { setBannerHref } = require('./test-data');


Given('Bob is on the homepage', async () => {
    //direct to modanisa homepage
    await ppt.page.goto('https://www.modanisa.com');

    //check if the title of the logo is modanisa
    const logoTitle = await ppt.page.evaluate(() => {
        let logo = document.querySelector("#header > div.wrapper > div > a.logo");
        return logo ? logo.getAttribute('title') : null;
    });

    try {
        assert.strictEqual(logoTitle, "Modanisa")
    } catch (error) {
        throw new Error("Bob's lost!!.. He's floating the web.", error)
    }
});

let bannerUrl; //to use the url in multiple functions.

When('Bob clicks on a banner', async () => {
    bannerUrl = await ppt.page.evaluate(() => {
        let banner = document.querySelector('[desktop_header_slot1_tr-0_link]');
        return banner ? banner.getAttribute('href') : null; //return href of the banner, if not available then return null
    })
    setBannerHref(bannerUrl); // storing bannerHref as a global variable to access it on different scenarios.

    await ppt.page.click('[desktop_header_slot1_tr-0_link]');
});

Then('Bob should be redirected to the associated listing page', async () => {

    const directedUrl = await ppt.page.url(); //get the url of the current page

    console.log('Banner href:', bannerUrl);
    console.log('Directed URL:', directedUrl);

    try {
        assert.strictEqual(bannerUrl, directedUrl);
    } catch (error) {
        throw new Error("Bob's lost!!.. He's floating the web.");
    }
});
