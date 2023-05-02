This is a simple personal project that is mocking a customer buying a dress on modanisa.com.

#Installation:
we need npm (node package manager), puppeteer and cucumber for this project. here is the version numbers please check these out if not working properly:
-npm: 9.4.0
-puppeteer: 19.8.5
-cucumber: 9.1.0 // use @cucumber/cucumber for the latest releases

first, install npm if you don't already have it.

`sudo apt install npm`               // Ubuntu
`sudo pacman -S npm   `             // Arch
`sudo yum install nodejs npm `  // Red Hat

after cloning this repository to your local machine, cd into it and run consecutively:

```
npm i puppeteer
npm i @cucumber/cucumber
```

@Usage:
`npm test`     // run all the tests

`npm run demo`     //  run the tests tagged as @demo. don't forget to tag scenarios in file 'tasks.feature'

##Note:

I've created a file 'hooks.js' and initialized puppeteer variables in it in order to access them globally without needing to initialize them again.
There were tons of error occured when I tried to initialize the variables 'page' and 'browser' in hooks.js and just simply export them, to fix it
I've created an object called 'ppt' and initialized puppeteer variables as argument.
