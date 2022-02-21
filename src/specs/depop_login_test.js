import LoginPage from  '../pages/login_page';
import MainPage from '../pages/main_page';
import ForgotPasswordPage from '../pages/forgot_password';
import AlertPage from '../pages/alert_page';

import login_testdata from '../testdata/login_testdata';

describe('Check Depop Login', () => {

    beforeEach(function(){
        MainPage.open_depop();
    });

    describe('Verify login page fields and redirection  to login from main page', () => {

      it('Go to login page and check fields.', async () => {

           await AlertPage.catch_alert_on_page();

           await MainPage.check_main_page_and_redirect_login();      

           await LoginPage.check_login_page_fields();

      });
  });

 
    describe('Verify that user will be able to login with a valid username and valid password.', () => {

        it('Login with a valid username and valid password.', async () => {
    
             await MainPage.check_main_page_and_redirect_login();      

             await LoginPage.login(login_testdata.USERNAME, login_testdata.PASSWORD);
             await LoginPage.check_succesffully_login();

        });
    });

    describe("Verify the login page for both, when the field is blank.", () => {
 
        it('Login with blank fields.', async () => {
         
              await MainPage.check_main_page_and_redirect_login();
      
              await LoginPage.login(login_testdata.EMPTY_USERNAME, login_testdata.EMPY_PASSWORD);
      
              await LoginPage.check_error_message_blank_fields(login_testdata.EMPTY_USERNAME, login_testdata.EMPY_PASSWORD)
      
         });
      });


      describe("Verify if a user cannot login with a invalid username and an invalid password.", () => {
         
        it('Login with a invalid data.',  async () => {
      
            await MainPage.check_main_page_and_redirect_login();
      
            await LoginPage.login(login_testdata.INVALID_USERNAME, login_testdata.INVALID_PASSWORD);
            await LoginPage.check_error_message_invalid_values_failed_attempt(login_testdata.EMPTY_USERNAME, login_testdata.EMPY_PASSWORD);
        
        });
      });


      describe("Verify the ‘Forgot Password’ functionality.	", () => {
  
        it('Click forgot password button and check forgot password page redirection',  async () => {
       
            await MainPage.check_main_page_and_redirect_login();
       
            await LoginPage.check_login_page();
       
            await ForgotPasswordPage.click_forgot_password();
            await ForgotPasswordPage.check_forgot_password_page();
       
         });
       });
      

     afterEach(() => {
         MainPage.reload_browser();
     });

});

