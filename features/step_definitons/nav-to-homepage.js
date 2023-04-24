const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const assert = require('assert');
const ppt = require('./hooks');
setDefaultTimeout(10000);


Given('Bob is on the internet', async () => {
    let response = await ppt.page.goto('https://www.google.com')
    if (response.status() == 200) { // look for HTML response. 200 means we're connected.
        console.log('Bob made it to the internet!')
    } else {
        throw new Error("Bob's lost!!: Response status != 200")
    }
});


When('Bob goes to www.modanisa.com', async () => {
    await ppt.page.goto('https://www.modanisa.com')
});


//check if the title attribute of the logo is modanisa
Then('Bob should see the modanisa homepage', async () => {
    //I've used js to fetch the logo
    const logoTitle = await ppt.page.evaluate(() => {
        let logo = document.querySelector("#header > div.wrapper > div > a.logo");
        return logo ? logo.getAttribute('title') : null; //return the title of the logo, if not available then return null
    });

    try {
        assert.strictEqual(logoTitle, "Modanisa") // check if logotitle is string "Modanisa"
    } catch (error) {
        throw new Error("Bob's lost!!.. He's floating the web.")
    }
    console.log(logoTitle)
});