class AlertPage {

    get cookieBanner () { return $('//div[@data-testid="cookieBanner"]'); }
    get acceptAllButton () { return $('//button[@data-testid="cookieBanner__acceptAllButton"]'); }


    isCookieBannerExist () {
        browser.pause(500);
        return this.cookieBanner.isDisplayed();  
      }

    async  catch_alert_on_page() {
        if(this.isCookieBannerExist()) {
         await this.acceptAllButton.click();
        }
    }
}

module.exports = new AlertPage();