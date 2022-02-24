import test_data from '../testdata/cyber_attack_statistics_testdata';
import Page from './page';
import { unabbreviateNumber } from "js-abbreviation-number";

class MainPage extends Page {

    get app() { return $('//div[@id="app"]'); }
    get filtering() { return $('//div[@class="filtering"]'); }
    get filter_input() { return $('//*[@id="filter-input"]'); }
    get sorting() { return $('//div[@class="sorting"]'); }
    get sort_select() { return $('//select[@id="sort-select"]'); }
    get table() { return $('//div[@class="table"]'); }
    get table_content() { return $('//div[@class="table-content"]'); }

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
       await browser.pause(2000)// just to see what's happening on the screen

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
        await browser.pause(2000)// just to see what's happening on the screen

       //check returned table rows, get row text after filtering,  should have filtering text
       const rows = await $$(function() { 
        return this.document.querySelectorAll(this.get_table_row_elements);
       });
        rows.forEach((element) => {
            expect(element.getText()).toHaveTextContaining(textToBeUsedForFilter);
        });
    }


    async check_sorting_functionality_with_different_sort_data() {
        //get all options from sorting selection
        const sort_options = await $$(function() { 
            return this.document.querySelectorAll("#sort-select > option"); 
        });

        //try all the options that received (in sort_options) one by one.
        for (var i = 0; i < sort_options.length; i++) {
            this.reload_browser();
            const selected_sort_value = await sort_options[i].getValue();

            await this.sort_select.selectByAttribute('value', await selected_sort_value);

            await browser.pause(2000)// just to see what's happening on the screen

            console.log(await selected_sort_value + ": Selected for sorting"); 

            await this.check_sorting_is_true(selected_sort_value);
        }
    }

    async check_sorting_is_true(selected_sort_value) {
        
        //get the column names that will be affected by the sorting
        const header_colon_items = await $$(function() { 
            return this.document.querySelectorAll("div.header__item"); 
        });

        const table_rows = await $$(function() { 
            return this.document.querySelectorAll("div.table-row"); 
        });


        let sorted_colon_element_list = await [];
        let sorted_colon_index= -1;

        //find out which column is affected by sort and add this colon elements to list
        for (var i = 0; i < header_colon_items.length; i++) {
            const lower_case_header_name = (await header_colon_items[i].getText()).toLowerCase();
            if(await lower_case_header_name.includes(selected_sort_value)){
                sorted_colon_index = i;
                break;
            }
        }
        for (var i = 0; i < table_rows.length; i++) {
            const sorted_element ="div.table-content > div.table-row:nth-child("+i+") > div.table-data:nth-child("+sorted_colon_index+")";
            const sorted_element_value =  await $(function() { return this.document.querySelector(this.sorted_element);});
            await sorted_colon_element_list.push(sorted_element_value); 
        }

        await this.check_order_of_table_values_according_to_rules(sorted_colon_element_list);

    } 

    async check_order_of_table_values_according_to_rules(sorted_colon_element_list) {

        let sorted_colon_value_list= [];
        sorted_colon_element_list.forEach((element) => {
             sorted_colon_value_list.push( element.getText());
        });

        switch(sorted_colon_value_list) {

            case sorted_colon_element_list.includes('low'|'medium'|'high'):
                this.check_sorting_of_complexity(sorted_colon_element_list);
                break;
            case sorted_colon_value_list.includes('K'|'k'|'m'|'M'|'b'|'B') && sorted_colon_value_list.includes('1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'0'):
                this.check_sorting_of_number_of_cases(this.sorted_colon_element_list);
                break;
            default:
                this.check_sorting_of_string_or_number(sorted_colon_element_list);
          }
    }

    async check_sorting_of_complexity(sorted_colon_element_list) {
    

           var complexityArray = ["low" , "medium", "high"]
           sorted_colon_element_list.forEach((element, index, arr) => {

                var first_element_complextiy = complexityArray.indexOf(element.getText()) ;
                var second_element_omplexity = complexityArray.indexOf(arr[index+1].getText())

                var check_complexity =first_element_complextiy - second_element_omplexity; // for same complexty low-low, high-high, medium-medum difference should be 0, low-high, low-medium etc. difference >0, if difference <0 thats meaning sorting is  not true
                
                expect(check_complexity).toBeGreaterThanOrEqual(0, { message: 'Complexity sorting is not working', }); //colon with sort() and already created colon on UI should same if sorted is
            });
   }

   async check_sorting_of_string_or_number(sorted_colon_element_list) {

        expect(sorted_colon_element_list.sort()).toEqual(sorted_colon_element_list, { message: 'String and number sorting is not working for name and number of cases .', }); //colon with sort() and already created colon on UI should same if sorted is
   }   

    async check_sorting_of_number_of_cases(sorted_colon_element_list) {
    
        let list = [];
        sorted_colon_element_list.forEach((element, index, arr) => {

            const num = unabbreviateNumber(element.getText());

            list[index] = num;
        });

        expect(list.sort()).toEqual(list, { message: 'Sorting is not working for number of cases', });
  } 
}


 export default new MainPage();
