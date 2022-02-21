import Page from './page';
import AlertPage from  './alert_page';

class MainPage extends Page {

    get navigation__login() { return $('//a[@data-testid="navigation__login"]'); }
    get depopLogo () { return $('//a[@data-testid="header__depopLogo"]');  }

    async open_depop() {
        await super.open_depop();
    }

    async reload_browser() {
        await super.reload_browser();
    }


    async check_main_page_and_redirect_login () {
        
        expect(this.depopLogo).toBeDisplayed();

        expect(this.navigation__login).toBeDisplayed();

        await this.navigation__login.click();

        console.log("Login button is clicking");
    }

}


 export default new MainPage();
