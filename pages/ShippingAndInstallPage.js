// Inlcude playwright module
const { expect } = require('@playwright/test')

// create class
exports.ShippingAndInstallPage = class ShippingAndInstallPage {
    /**
     * 
     * @param {import ('@playwright/test').Page} page 
     */
    constructor(page){
        // Init page object
        this.page = page;
        // Elements
        this.Continue=page.getByRole('button', { name: 'Continue' });
        this.SearchConsigneeAddress=page.locator('a').filter({ hasText: 'Search Ultimate Consignee' });
        this.SearchShippingAddress=page.locator('a').filter({ hasText: 'Search Shipping Address' });
        this.AdvanceSearch=page.getByText('Advance Search and Add New');
        this.SiteID=page.getByLabel('Search By Site Id');
        this.Search=page.getByRole('button', { name: 'Search' });
        this.SelectAddress=page.getByRole('button', { name: 'Use Selected Address' });
        this.SearchEndCustContact=page.locator('a').filter({ hasText: 'Search End Customer Contact' });
        this.SearchShippingContact=page.locator('a').filter({ hasText: 'Search Shipping Contact' });
        this.AddContact=page.locator('a').filter({ hasText: 'Add a New Contact' });
        this.FistName=page.getByLabel('First Name');
        this.LastName=page.getByLabel('Last Name');
        this.Email=page.getByLabel('Email Address');
        this.ContactNumber=page.locator("//input[@name='phoneNumber']");
        this.Attn=page.locator('label').filter({ hasText: 'Attn:Receiving' });
        this.Create=page.getByRole('button', { name: 'Create', exact: true });
        this.RequestDate=page.locator('#requestedShipDate_51191143_datepicker');
        this.ReqDate=page.locator("//input[contains(@kdfid,'requestedShipDate')]");
        this.DateSelect=page.getByRole('link', { name: '30' });
        this.DateSel=page.locator("//a[text()='30']");
        this.SaveAndContinue=page.getByRole('button', { name: 'Save and Continue' });
    }

    async searchAndAddConsigneeAddress(){
        await expect(this.SearchConsigneeAddress).toBeVisible({ timeout: 15000 });
        await this.SearchConsigneeAddress.click();
        await expect(this.AdvanceSearch).toBeVisible({ timeout: 15000 });
        await this.AdvanceSearch.click();
        await expect(this.SiteID).toBeVisible({ timeout: 15000 });
        await this.SiteID.fill("2715851");
        await this.Search.click();
        // await expect(this.SelectAddress).toBeVisible({ timeout: 15000 });
        await this.SelectAddress.click();
        // await this.page.waitForTimeout(3000);
    }

    async searchAndAddShippingAddress(){
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.SearchShippingAddress).toBeVisible({ timeout: 15000 });
        await this.SearchShippingAddress.click();
        await expect(this.AdvanceSearch).toBeVisible({ timeout: 15000 });
        await this.AdvanceSearch.click();
        await expect(this.SiteID).toBeVisible({ timeout: 15000 });
        await this.SiteID.fill("2715851");
        await this.Search.click();
        // await expect(this.SelectAddress).toBeVisible({ timeout: 15000 });
        await this.SelectAddress.click();
        // await this.page.waitForTimeout(3000);
    }

    async addEndCustomerContactDetails(){
        await expect(this.SearchEndCustContact).toBeVisible({ timeout: 15000 });
        await this.SearchEndCustContact.click();
        await expect(this.AddContact).toBeVisible({ timeout: 15000 });
        await this.AddContact.click();
        await expect(this.FistName).toBeVisible({ timeout: 15000 });
        await this.FistName.fill("Test");
        await this.LastName.fill("Test");
        await this.Email.fill("Test@cisco.com");
        await this.ContactNumber.fill("6699235674");
        await this.Attn.click();
        await this.Create.click();
        // await expect(this.SelectAddress).toBeVisible({ timeout: 15000 });
        // await this.page.waitForTimeout(3000);
    }

    async addShippingContactDetails(){
        await this.page.waitForLoadState('domcontentloaded');
        await expect(await this.SearchShippingContact).toBeVisible({ timeout: 15000 });
        await this.SearchShippingContact.click();
        await expect(await this.AddContact).toBeVisible({ timeout: 15000 });
        await this.AddContact.click();
        await expect(await this.FistName).toBeVisible({ timeout: 15000 });
        await this.FistName.fill("Test");
        await this.LastName.fill("Test");
        await this.Email.fill("Test@cisco.com");
        await this.ContactNumber.fill("6699235674");
        await this.Attn.click();
        await this.Create.click();
        // await expect(this.SelectAddress).toBeVisible({ timeout: 15000 });
        // await this.page.waitForTimeout(3000);
    }

    async addRequestDateAndContinue(){
        // await expect(this.RequestDate).toBeVisible({ timeout: 15000 });
        await this.ReqDate.click();
        await this.DateSel.click();
        await this.SaveAndContinue.click();
    }

    // async updatePONumber(){
    //     await this.EditPO.click();
    // }
}