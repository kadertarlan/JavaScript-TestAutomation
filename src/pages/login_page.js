import login_testdata from '../testdata/login_testdata';
import Page from './page';

class LoginPage extends Page {

    get login_form_title() {return $('//h1[@data-testid="login_form_title"]'); }
    get username() { return $('//*[@id="username"]'); }
    get password () { return $('//input[@data-testid="password"]'); }
    get forgot_password () { return $('//a[@data-testid="forgotPassword__button"]'); }
    get login_button () { return $('//button[@data-testid="login__cta"]'); }
    get signup__button () { return $('//a[@data-testid="signup__button"]'); }
    get profile_avatar () { return $('//div[@data-testid="avatar"]'); }
    get login_error_username () { return $('//p[@data-testid="login__error--username"]'); }
    get login_error_password () { return $('//p[@data-testid="login__error--password"]'); }
    get login__error_server () { return $('//p[@data-testid="login__error--server"]'); }
    
    async login (email_text, password_text) {

        await super.wait_page_upload();
        await this.check_page_title(login_testdata.LOGIN_PAGE_TITLE);

        await this.username.setValue(email_text);
        await this.password.setValue(password_text);

        await this.login_button.click();

    }

    async check_login_page_fields() {

        expect(await this.login_form_title).toBeDisplayed();
        expect(await this.username).toBeDisplayed();
        expect(await  this.password).toBeDisplayed();
        expect(await this.forgot_password).toBeDisplayed();
        expect(await this.login_button).toBeDisplayed();
        expect(await this.signup__button).toBeDisplayed();
    }

    async get_to_login_page() {
         super.open(login_testdata.LOGINURL);
    }

    async fill_username(email_text){
        expect(await this.username).toBeDisplayed();
        await this.username.sendKeys(email_text);
    }
    
     async fill_password(password_text){
        expect(await this.password).toBeDisplayed();
        await this.password.sendKeys(password_text);
    }

    async click_login() {
        expect(await this.login_button).toBeDisplayed();
        await this.login_button.click();
    }

    async check_page_title(form_title)
    {
        browser.waitUntil(function(){
            return this.login_form_title.getText() == form_title
        }, 10000, "Login page is not visible");

        console.log(this.login_form_title.getText());
    }

    async check_succesffully_login()
    {
        browser.waitUntil(function(){
            
             expect(this.profile_avatar).toBeDisplayed();

        }, 10000, "Successfully login is not happened.");
        console.log( "Success login");
    }

    async check_login_page() {

         expect(await this.username).toBeDisplayed();
         expect(await this.password).toBeDisplayed();

        console.log("Login page is not visible.");
    }

    async check_error_message_invalid_values_failed_attempt()
    {

         expect(await this.login_error_username).toBeDisplayed();
         expect(await this.login_error_password).toBeDisplayed();

         expect(await this.login_error_username).toHaveTextContaining(login_testdata.USERNAME_ERROR_MESSAGE);
         expect(await this.login_error_password).toHaveTextContaining(login_testdata.PASSWORD_ERROR_MESSAGE);

        console.log("Error message is not visible with invalid username and password.");
    }

    async check_error_message_blank_fields()
    {
        expect(await this.login__error_server).toBeDisplayed();

        expect(await this.login__error_server).toHaveTextContaining(login_testdata.INCORRECT_VALUES_ERROR_MESSAGE);

        console.log("Error message is not visible with blank fields.");
    }
}

export default new LoginPage();
