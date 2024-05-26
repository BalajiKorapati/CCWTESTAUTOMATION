// Inlcude playwright module
const { expect } = require('@playwright/test')

// create class
exports.LoginPage = class LoginPage {
    /**
     * 
     * @param {import ('@playwright/test').Page} page 
     */
    constructor(page){
        // Init page object
        this.page = page;
        // Elements
        this.Email=page.getByLabel('Email');
        this.Next= page.getByRole('button', { name: 'Next' });
        this.Password=page.getByLabel('Password');
        this.Verify=page.getByRole('button', { name: 'Verify' });
    }

    async launchURL(){
        await this.page.setViewportSize({width:1366, height:728})
        // await this.page.goto(process.env.URL);
        await this.page.goto("https://ccw-cstg.cisco.com/icw/pdrqo/portal.order");
        // await this.links;
    }

    async loginToApplication(){
        // await expect(this.searchTextbox).toBeEnabled();
        await this.Email.fill('maria.roark@aos5.com');
        // console.log("Links - "+ ().length);
        await this.Email.press('Tab');
        await this.Next.click();
        await this.Password.fill('Cisco@sept2023');
        await this.Verify.click();
    }
}