// Inlcude playwright module
const { expect } = require('@playwright/test')

// create class
exports.BillingPage = class BillingPage {
    /**
     * 
     * @param {import ('@playwright/test').Page} page 
     */
    constructor(page){
        // Init page object
        this.page = page;
        // Elements
        this.Taxability=page.getByText('ResaleSelect "Resale" if the');
        this.Continue=page.getByRole('button', { name: 'Continue' });
        this.PayMethod=page.getByText('Purchase Order', { exact: true });

        this.Terms=page.locator('#dynamicId4');
        this.Ack=page.locator('#smartDefaultAckCheck');
        this.SubmitOrder=page.locator('#submitOrder12');
    }

    async AddBillingDetails(){
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.Taxability).toBeVisible({ timeout: 15000 });
        await this.Taxability.click();
        await this.Continue.click();
        await expect(this.Continue).toBeVisible({ timeout: 15000 });
        await this.Continue.click();
        await expect(this.PayMethod).toBeVisible({ timeout: 15000 });
        await this.PayMethod.click();
        await this.Continue.click();
    }

    async ReviewAndSubmit(){
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.Terms).toBeVisible({ timeout: 15000 });
        await this.Terms.click();
        await this.Ack.click();
        await expect(this.SubmitOrder).toBeVisible({ timeout: 15000 });
        await this.SubmitOrder.click();
    }
}