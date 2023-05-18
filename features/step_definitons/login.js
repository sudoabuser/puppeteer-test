const {When, setDefaultTimeout } = require('@cucumber/cucumber');
const ppt = require('./hooks');
setDefaultTimeout(20000);


When('Bob is on the login page', async () => {
    await ppt.page.goto("https://www.modanisa.com/membership/login/?return=%2F", {waitUntil:'domcontentloaded'});    // navigate to login page
});

When('Bob fills out his login information', async () => {    // click login with email and fill the login informations
    await ppt.page.click(".select-email");
    await ppt.page.click("#email");
    await ppt.page.keyboard.type("modanisatest0@gmail.com");
    await ppt.page.click("#password");
    await ppt.page.keyboard.type("Test12345-");
});

When('Bob clicks on login button', async () => {    // click login button
    await ppt.page.waitForSelector('.confirm')
    await ppt.page.$eval('.confirm', (el) =>{
        return el.click() 
    })
    await ppt.page.waitForNavigation({waitUntil:'domcontentloaded'});
});
