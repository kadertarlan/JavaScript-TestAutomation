export default class Page {

    open_depop() {
        browser.maximizeWindow();
        return browser.url('https://www.depop.com/');
    }

    reload_browser () {
        console.log("Reload session of browser");
        browser.reload();
      }

     open(link) {
        browser.maximizeWindow();
        return browser.url(link);
    }

    wait_page_upload(){
        browser.waitUntil(
            () => browser.execute(() => document.readyState === 'complete')),
            {
              timeout: 60 * 1000, 
              timeoutMsg: 'Message on failure'
            }
    }
}
