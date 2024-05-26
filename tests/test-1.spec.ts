import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://int-id.cisco.com/oauth2/default/v1/authorize?response_type=code&scope=openid%20profile%20address%20offline_access%20cci_coimemberOf%20email&client_id=cae-okta-int-web-gslb-01&state=0vktdndruYZPcKC6OUAAocq0cRE&redirect_uri=https%3A%2F%2Fccw-cstg.cisco.com%2Fcb%2Fsso&nonce=PVWQxWM2EqVpj-bgt1K-2CUbsMWId0r7IwmHNqrLxa8');
  await page.getByLabel('Email').fill('maria.roark@aos5.com');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Cisco@sept2023');
  await page.getByRole('button', { name: 'Verify' }).click();
  await page.locator('#wsMenubarTemplDiv').getByRole('link', { name: 'Orders', exact: true }).click();
  await page.getByRole('link', { name: 'Create Order' }).click();
  await page.getByRole('link', { name: 'Skip' }).click();
  await page.locator('#nav2 > div:nth-child(3) > .label_radio').click();
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.locator('#orderName').click();
  await page.locator('#orderName').fill('TestAutomation');
  await page.getByRole('link', { name: 'Global Price List in US' }).click();
  await page.getByRole('link', { name: 'Global Price List US' }).click();
  await page.getByRole('link', { name: 'Resale' }).click();
  await page.locator('#sbOptions_81008644').getByRole('link', { name: 'Resale' }).click();
});