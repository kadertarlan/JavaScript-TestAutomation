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

* Sorting works only in one direction: from low to high, from A to Z, sorting by complexity sorts from low to high
* Filtering: Number of cases uses special formatting, thousands might be expressed as letter "k" (5000 = 5k), millions as M (1200000 = 1.2M), billions as "B" (1580000000 = 1.58B)
* Solution will work if we add another column between a name and number of cases


### Tests path:
        /JavaScript-TestAutomation/src/specs/cyber_attack_statistics_test.js


Help pages:
https://docs.npmjs.com/cli/v7/commands/npm-test
https://nodejs.org/en/docs/guides/getting-started-guide/


