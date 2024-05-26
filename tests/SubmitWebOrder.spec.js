// Include playwright module
const { test,expect } = require('@playwright/test')
const { LoginPage } = require('../pages/LoginPage');
const { HomePage } = require('../pages/HomePage');
const { CreateOrdersPage } = require('../pages/CreateOrdersPage');
const { AddItemsPage } = require('../pages/AddItemsPage');
const { DiscountsPage } = require('../pages/DiscountsPage');
const { ShippingAndInstallPage} = require('../pages/ShippingAndInstallPage');
const {BillingPage}=require('../pages/BillingPage');

// Write a test
test('Submit Web Order', async({page}) =>{
    test.setTimeout(120000);
    // Go to URL
    const loginPage = new LoginPage(page);
    await loginPage.launchURL();
   
    // Login
    await loginPage.loginToApplication();

    // Navigate to Orders
    const homePage = new HomePage(page);
    await homePage.verifyHomePageIcon();
    await homePage.navigateToOrdersPage();

    // Create Orders
    const createOrdersPage = new CreateOrdersPage(page);
    await createOrdersPage.CreateOrderWithOutDealID();
    await createOrdersPage.EnterOrderDetails();
    // await createOrdersPage.addBillingAddress();
    await createOrdersPage.searchAndAddEndCustomerAddress();

    // Add Item
    const addItemsPage = new AddItemsPage(page);
    await addItemsPage.getWebOrderID();
    await addItemsPage.AddSingleItem();

    //Discount
    const discountsPage = new DiscountsPage(page);
    discountsPage.validateDiscountsAndContinue();

    //Shipping and Install
    const shippingAndInstallPage = new ShippingAndInstallPage(page);
    await shippingAndInstallPage.searchAndAddConsigneeAddress();
    await shippingAndInstallPage.searchAndAddShippingAddress();
    await shippingAndInstallPage.addEndCustomerContactDetails();
    await shippingAndInstallPage.addShippingContactDetails();
    await shippingAndInstallPage.addRequestDateAndContinue();

    //Billing Review & Submit
    const billingPage = new BillingPage(page);
    await billingPage.AddBillingDetails();
    await billingPage.ReviewAndSubmit();


    await page.waitForTimeout(8000);

})

    