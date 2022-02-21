
chalk=require("chalk");
warning=chalk.red;

class Abstract {
        
   describe = function (title, fn) {
    try {
         console.log(`Test suite: ${chalk.green(title)}`);
         await fn();
    } catch (err) {
         console.log(chalk.redBright(`[${err.message.toUpperCase()}]`));
      }
    }


    it = function(testName, fn){
         console.log(`Test name: ${testName}`);
         try {
             fn();

        } catch (err) {
              console.log(err);
              new Error('Test failed.');
        }
    }


    expect = function(expectedValue){
          matchers(expectedValue);
    };

     matchers =  function(expectedValue){
        isEqual: (actualValue) => {
           if (expectedValue === actualValue) {
             console.log(expectedValue + ' is equal  ' + actualValue);
              return true;
          } else {
              console.log(expectedValue+ ' is not equal '+ actualValue);
              return false;
          }
        }
      };

     contains =  function(text, subtext, index) {
       return text.indexOf(subtext, index) !== -1;
    };
   
}

module.exports = new AlertPage();

