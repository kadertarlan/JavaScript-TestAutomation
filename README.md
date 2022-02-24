# Javascript Automation Project - EclecticIQ
------------


### About Project

This project was developed with JavaScript and Mocha and WebdriverIO (https://webdriver.io/docs/gettingstarted)

 Mocha allows to choose style of DSL. For this project I choose BDD:
- BDD provides describe(), it(), before(), after(), beforeEach(), and afterEach()
```
 describe(string, function => { 
    it(string, function => {
        expect(actual.toEqual(‘expected); 
    });
});

```
-------------
## Installation
### 1. Open terminal
### 2.  Install Node.js (check if you have it via node -v in a command prompt)

*Download the Node.js source code  : https://nodejs.org/en/download/  *

>sudo npm install -g npm
> 
>node -v
> 
>npm -v

### 2. Run git init before clone project
>git init
### 3. Clone project from git repository
>git clone https://github.com/kadertarlan/JavaScript-TestAutomation.git

### 4. Go to test Project Directory in Terminal
### 5. Run tests      
>npm test


------------
#####Test cases:
- Verify Cyber attack statistics filtering feature - without result
- Verify Cyber attack statistics filtering feature - with result
- Verify Cyber attack statistics sorting feature - With NAME, NUMBER OF CASES, AVERAGE IMPACT SCORE, COMPLEXITY


### Tests path:
        /JavaScript-TestAutomation/src/specs/cyber_attack_statistics_test.js


Help pages:
https://docs.npmjs.com/cli/v7/commands/npm-test
https://nodejs.org/en/docs/guides/getting-started-guide/


