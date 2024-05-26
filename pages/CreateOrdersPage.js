// Inlcude playwright module
const { expect } = require('@playwright/test')

// create class
exports.CreateOrdersPage = class CreateOrdersPage {
    /**
     * 
     * @param {import ('@playwright/test').Page} page 
     */
    constructor(page){
        // Init page object
        this.page = page;
        // Elements
        this.CreateOrder=page.getByRole('link', { name: 'Create Order' });
        this.Skip= page.getByRole('link', { name: 'Skip' });
        this.WithOutDeal=page.locator('#nav2 > div:nth-child(3) > .label_radio');
        this.Continue=page.getByRole('button', { name: 'Continue' });
        this.OrderName=page.locator('#orderName');
        this.PriceList=page.locator('//a[@kdfid="sbSelector_priceListDropDownId"]');
        this.PriceListValues=page.$$('//a[@kdfid="sbSelector_priceListDropDownId"]//parent::div//ul//li//a');
        // this.IntendedUse=page.getByRole('link', { name: 'Resale'});
        this.IntendedUse=page.locator('//a[@kdfid="sbSelector_intendedUseDropDownId"]');
        this.IntendedUseValues=page.$$('//a[@kdfid="sbSelector_intendedUseDropDownId"]//parent::div//ul//li//a');
        this.GotIt=page.getByRole('button', { name: 'Got it' });
        this.EditBillingAndEndCustomer=page.locator('#card-adrs-billing-address tooltip-component').filter({ hasText: 'EDIT' }).locator('span').nth(2);
        this.BillingAddress=page.locator("#input-billing-address");

        this.SearchEndCustomerAddress=page.locator('a').filter({ hasText: 'Search End Customer Address' });
        this.AdvanceSearch=page.getByText('Advance Search and Add New');
        this.SiteID=page.getByLabel('Search By Site Id');
        this.Search=page.getByRole('button', { name: 'Search' });
        this.SelectAddress=page.getByRole('button', { name: 'Use Selected Address' });
        
    }

    async CreateOrderWithOutDealID(){
        await this.CreateOrder.click();
        await this.Skip.click();
        await this.GotIt.click();
        await this.WithOutDeal.click();
        await this.Continue.click();
    }

    async EnterOrderDetails(){
        // const gotIt=this.GotIt.isVisible();
        // console.log("Got Element is - "+ gotIt);
        // gotIt.then
        // if(gotIt){
        //     await this.GotIt.click();
        // }
        if(await this.GotIt.isVisible()){
            console.log("Got Element is - "+ await this.GotIt.isVisible());
            await this.GotIt.click();
          }
        await this.OrderName.fill('TestAutomationOrder');
        await this.PriceList.click();
        const allPriceList=await this.page.$$('//a[@kdfid="sbSelector_priceListDropDownId"]//parent::div//ul//li//a');
        console.log("Price List Size is - "+allPriceList.length);
        for(const allPL of allPriceList){
            let value= await allPL.textContent();
            if(value.includes('Global Price List US Availability')){
                await allPL.click();
            }
        }
        // await page.getByRole('link', { name: 'Global Price List US' }).click();
        await expect(this.IntendedUse).toBeVisible({ timeout: 15000 });
        await this.page.waitForLoadState('domcontentloaded');
        await this.IntendedUse.click();
        const allIntendedUse=await this.page.$$('//a[@kdfid="sbSelector_intendedUseDropDownId"]//parent::div//ul//li//a');
        console.log("Intended Use Size is - "+allIntendedUse.length);
        for(const allIU of allIntendedUse){
            let value= await allIU.textContent();
            console.log(value);
            if(value.includes('Resale')){
                await allIU.click();
            }
        }
    }

    async addBillingAddress(){
        await this.EditBillingAndEndCustomer.click();
        await this.BillingAddress.fill("TECH DATA");
        await this.page.waitForTimeout(3000);
        const allAddress=await this.page.$$("///table[@class='icwTable searchBodyAddress']//tr");
        console.log("Address Size is - "+allAddress.length);
        for(const allAdd of allAddress){
            let value= await allAdd.textContent();
            if(value.includes('TECH DATA')){
                allAdd.click();
            }
        }
    }

    async searchAndAddEndCustomerAddress(){
        await this.SearchEndCustomerAddress.click();
        await expect(this.AdvanceSearch).toBeVisible({ timeout: 15000 });
        await this.AdvanceSearch.click();
        await this.SiteID.fill("2715851");
        await this.Search.click();
        await expect(this.SelectAddress).toBeVisible({ timeout: 15000 });
        await this.SelectAddress.click();
        await this.page.waitForTimeout(5000);
        await this.Continue.click();
    }
}