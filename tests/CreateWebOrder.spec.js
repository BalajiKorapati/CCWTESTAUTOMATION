import {test, expect} from '@playwright/test'

test("Login to Application", async({page})=>{
    await page.goto("https://ccw-cstg.cisco.com/icw/pdrqo/portal.order");

    await page.fill('//input[@autocomplete="username"]', 'maria.roark@aos5.com');
    await page.getByRole('button',{name: 'Next'}).click();
    // await page.click('//input[@type="submit"]');
    await page.fill('//input[@type="password"]', 'Cisco@sept2023');
    await page.click('//input[@type="submit"]');
    await expect(await page.locator('//a[@class="commonHome"]')).toBeVisible({ timeout: 15000 });
    await page.locator('#wsMenubarTemplDiv').getByRole('link', { name: 'Orders', exact: true }).click();
    // await page.click('//a[normalize-space()="Orders"]//parent::li');
    await page.getByRole('link', { name: 'Create Order' }).click();
    // await expect(await page.locator('//a[@kdfid="createOrder"]')).toBeVisible({ timeout: 15000 });
    // await page.click('//a[@kdfid="createOrder"]');

    await page.getByRole('link', { name: 'Skip' }).click();
    // await page.getByRole('link', { name: 'Skip' }).toBeVisible({ timeout: 15000 });
    // await expect(await page.locator('//input[@class="orderWithDealId"]')).toBeVisible({ timeout: 15000 });

    await page.click('//input[@class="orderWithNoDealId"]//parent::label');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.locator('#orderName').fill('TestAutomationOrder');
    await page.click('//a[@kdfid="sbSelector_priceListDropDownId"]');
    const allPriceList=await page.$$('//a[@kdfid="sbSelector_priceListDropDownId"]//parent::div//ul//li');
    for(const allPL of allPriceList){
        let value= await allPL.textContent();
        if(value.includes('Global Price List US Availability')){
            allPL.click();
        }
    }
    // await page.getByRole('link', { name: 'Global Price List US' }).click();
    await page.getByRole('link', { name: 'Resale' }).click();
    await page.locator('#createOrder div').filter({ hasText: 'Is it a Managed Service Order? Yes No Managed Service Contractual Provider *' }).locator('label').nth(2).click();
    await page.locator('tooltip-component').filter({ hasText: 'EDIT' }).locator('span').nth(2).click();
    await page.locator('a').filter({ hasText: 'Search End Customer Address' }).click();
    await page.getByText('Advance Search and Add New').click();
    await page.getByLabel('Search By Site Id').click();
    await page.getByLabel('Search By Site Id').fill('2715851');
    await page.getByRole('button', { name: 'Search' }).click();
    await page.getByRole('button', { name: 'Use Selected Address' }).click();

    await page.getByText('New Items').click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByPlaceholder('Add items by SKU, Description').click();

    await page.waitForTimeout(15000);
})
