import Page from './page';

class ForgotPasswordPage extends Page {

 get forgot_password () { return $('//a[@data-testid="forgotPassword__button"]'); }
 get forgot_pass_form_title() {return $('//*[@id="main"]/h1'); }
 get forgot_password_by_text () { return $('//*[text()="Forgot Password?"]'); }
 
 async click_forgot_password_button () {

    expect( await this.forgot_password).toBeDisplayed();

    await this.forgot_password.click();

}

async check_forgot_password_page() {  

        await this.wait_page_upload()

        expect(await this.forgot_pass_form_title).toBeDisplayed();
        
        console.log("Forgot Password");
 }

}

export default new ForgotPasswordPage();