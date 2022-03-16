import MainPage from '../pages/main_page';


describe('Check Cyber attack statistics', () => {

    beforeEach(function(){
        MainPage.open_cyber_attack_statistics();
    });

    describe('Verify Cyber attack statistics filtering feature - without result', () => {

      it('Check filtering feature functionality with invalid data', async () => {

           await MainPage.check_cyber_attack_statistics_page_is_visible();

           await MainPage.check_filtering_functionality_with_invalid_data();   


      }); 
  });

  describe('Verify Cyber attack statistics filtering feature - with result', () => {

    it('Check filtering feature functionality with valid data', async () => {

         await MainPage.check_cyber_attack_statistics_page_is_visible();

         await MainPage.check_filtering_functionality_with_valid_data();      

    });
  });

   describe('Verify Cyber attack statistics sorting feature', () => {

    it('Check sorting feature functionality', async () => {

        await MainPage.check_cyber_attack_statistics_page_is_visible();

        const isSorting = await MainPage.check_sorting_functionality_with_different_sort_data();  

        isSorting.forEach(
            sort_check => { 
                expect(sort_check).toBe(true,'Sorting is not working properly');})       
    });
});

     afterEach(() => {
         MainPage.reload_browser();
     });

});

