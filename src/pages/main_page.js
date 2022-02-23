import test_data from '../testdata/cyber_attack_statistics_testdata';
import Page from './page';

class MainPage extends Page {

    get app() { return $('//div[@id="app"]'); }
    get filtering() { return $('//div[@class="filtering"]'); }
    get filter_input() { return $('//*[@id="filter-input"]'); }
    get sorting() { return $('//div[@class="sorting"]'); }
    get sort_select() { return $('//select[@id="sort-select"]'); }
    get table() { return $('//div[@class="table"]'); }
    get table_content() { return $('//div[@class="table-content"]'); }
    
    async get_table_colon_size() {
        const table_colon = await $$('//div[@class="table-header"]//div[@class="header__item"]');
        table_colon.waitForExist() 
        return table_colon.length;
    }

    async get_table_row_elements() {
        return await ("div.table-content > div.table-row");
    }

    async get_table_data_elements() {
        return await ("div.table-content > div> div.table-data.data-name");
    }

    async open_cyber_attack_statistics() {
        await super.open_cyber_attack_statistics();
    }

    async reload_browser() {
        await super.reload_browser();
    }

    async check_cyber_attack_statistics_page_is_visible () {
        
        expect(this.app).toBeDisplayed();

        expect(this.filtering).toBeDisplayed();

        expect(this.sorting).toBeDisplayed();

        expect(this.table).toBeDisplayed();

        console.log("Cyber attack statistics is visible");
    }
    
    async enter_filter_data_value(filter_data) {
        expect( await this.filter_input).toBeDisplayed();
        await this.filter_input.setValue(filter_data);
        
        console.log("Filter data was entered");
    }
    
    async check_filtering_functionality_with_invalid_data() {

        //use random data for filtering field
        await this.enter_filter_data_value(test_data.RANDOM_DATA);
        expect(await this.table_content).not.toBeDisplayed();

       //check returned table after filtering
       const table_rows = await $$(function() { 
           return this.document.querySelectorAll(this.get_table_row_elements);
       });

        expect(table_rows.length).toBe(0, { message: "Table of statistics is not empty after invalid filtering."});

        console.log("Checking filtering functionality with invalid data");
    }

    async check_filtering_functionality_with_valid_data() {

        await browser.waitUntil(
            async () => (await this.table_content.isDisplayed == true,
            {
                timeout: 5000,
                timeoutMsg: 'table_content is not visible before filtering'
        }));

        //first data of table, always will return result with filtering, and will check funcitonality of filtering with valid data
        const textToBeUsedForFilter = await $$(function() { 
            return this.document.querySelectorAll("div.table-data"); 
        })[0].getText();

        //enter filter data with exist value from table (first data of exist table)
        await this.enter_filter_data_value(textToBeUsedForFilter); 
        await browser.waitUntil(
            async () => (await this.table_content.isDisplayed == true,
            {
                timeout: 5000,
                timeoutMsg: 'table_content is not visible after filtering'
        }));

       //check returned table rows, get row text after filtering,  should have filtering text
       const rows = await $$(function() { 
        return this.document.querySelectorAll(this.get_table_row_elements);
    });
    rows.forEach((element) => {
         expect(element.getText()).toHaveTextContaining(textToBeUsedForFilter);
     });

    }
}


 export default new MainPage();
