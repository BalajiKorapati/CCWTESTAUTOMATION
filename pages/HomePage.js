// Inlcude playwright module
const { expect } = require('@playwright/test')

// create class
exports.HomePage = class HomePage {
    /**
     * 
     * @param {import ('@playwright/test').Page} page 
     */
    constructor(page){
        // Init page object
        this.page = page;
        // Elements
        this.HomePageIcon=page.locator('//a[@class="commonHome"]');
        this.Orders= page.locator('#wsMenubarTemplDiv').getByRole('link', { name: 'Orders', exact: true });
    }

    async verifyHomePageIcon(){
        await expect(await this.HomePageIcon).toBeVisible({ timeout: 35000 });
    }

    async navigateToOrdersPage(){
        await expect(this.Orders).toBeVisible({ timeout: 10000 });
        await this.Orders.click();
    }
}