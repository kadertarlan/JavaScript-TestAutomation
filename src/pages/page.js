import { PAGE_URL } from "../testdata/cyber_attack_statistics_testdata";

export default class Page {

    open_cyber_attack_statistics() {
        browser.maximizeWindow();
        return browser.url(PAGE_URL);
    }

    reload_browser () {
        console.log("Reload session of browser");
        browser.reload();
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
