// Inlcude playwright module
const { expect } = require('@playwright/test')

// create class
exports.DiscountsPage = class DiscountsPage {
    /**
     * 
     * @param {import ('@playwright/test').Page} page 
     */
    constructor(page){
        // Init page object
        this.page = page;
        // Elements
        this.Continue=page.getByRole('button', { name: 'Continue' });
    }

    async validateDiscountsAndContinue(){
        await this.Continue.click();
        // await this.page.waitForTimeout(3000);
    }

    // async updatePONumber(){
    //     await this.EditPO.click();
    // }
}