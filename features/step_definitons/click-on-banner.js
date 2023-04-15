const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const ppt = require('./hooks');


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
        throw new Error("Bob's lost!!: Bob is not on Modanisa... He's floating the web.", error)
    }
});

//create a variable to store the href of the banner we're going to click
let bannerHref;

When('Bob clicks on a banner', async () => {
    bannerHref = await ppt.page.evaluate(() => {
        let banner = document.querySelector('#desktop_hero_slot1_tr > div > a');
        return banner ? banner.getAttribute('href') : null; //return href of the banner, if not available then return null
    });

    await ppt.page.click('#desktop_hero_slot1_tr > div > a');
});

Then('Bob should be redirected to the associated listing page', async () => {

    const directedUrl = await ppt.page.url(); //get the url of the current page

    console.log('Banner href:', bannerHref);
    console.log('Directed URL:', directedUrl);

    try {
        assert.strictEqual(bannerHref, directedUrl);
    } catch (error) {
        throw new Error("Bob's lost!!.. He's floating the web.");
    }

});

module.exports = bannerHref //export this to use it on 'scenario: select a product from listing page'