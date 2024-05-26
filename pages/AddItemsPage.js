// Inlcude playwright module
const { expect } = require('@playwright/test')

// create class
exports.AddItemsPage = class AddItemsPage {
    /**
     * 
     * @param {import ('@playwright/test').Page} page 
     */
    constructor(page){
        // Init page object
        this.page = page;
        // Elements
        this.EditPO=page.locator('label').filter({ hasText: 'Purchase Order #* EDIT' }).locator('span').nth(3);
        this.WebOrderID=page.locator("//label[normalize-space()='Web Order ID']//following-sibling::span");
        this.PONumberField=page.locator('#order-header').getByRole('textbox');
        this.PONumberUpdate=page.locator('#order-header').getByText('Update', { exact: true });
        this.AddItemField=page.getByPlaceholder('Add items by SKU, Description');
        this.Quantity=page.getByRole('textbox').nth(3);
        this.ItemInDropDown=page.locator("(//div[@class='advance-search']//ul/li)[2]//span");
        this.Add=page.getByRole('button', { name: 'Add' });
        this.POLineRef=page.locator("//input[@data-tracking-id='itemsTab-po-ref-input']");
        this.Continue=page.getByRole('button', { name: 'Continue' });
    }

    async getWebOrderID(){
        await this.page.waitForLoadState('domcontentloaded');
        await expect(await this.WebOrderID).toBeVisible({ timeout: 15000 });
        const webOrder= await this.WebOrderID.textContent();
        await this.EditPO.click();
        await this.PONumberField.fill(webOrder);
        await this.PONumberUpdate.click();
    }

    // async updatePONumber(){
    //     await this.EditPO.click();
    // }

    async AddSingleItem(){
        // await expect(this.searchTextbox).toBeEnabled();
        await this.AddItemField.fill('CAB-C15-CBN=');
        // console.log("Links - "+ ().length);
        await this.AddItemField.press('Tab');
        await this.Quantity.fill('1');
        // await this.ItemInDropDown.click();
        await this.Add.click();
        await expect(this.POLineRef).toBeVisible({ timeout: 15000 });
        await this.POLineRef.fill('1');
        // await this.page.waitForTimeout(5000);
        await this.Continue.click();
        await this.Continue.click();
    }
}