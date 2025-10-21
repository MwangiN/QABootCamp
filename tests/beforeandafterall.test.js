import { test, expect } from '@playwright/test';

let context;
let page;

test.describe.configure({ mode: 'serial' }); // run tests one by one

test.beforeAll(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();

  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await expect(page.getByText('Swag Labs')).toBeVisible();
  console.log('Logged in successfully before all tests');
});

test.afterAll(async () => {
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();

  // Correct verification
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();

  await context.close();
  console.log('Logged out and closed context after all tests');
});

test('sauce labs backpack', async () => {
  await page.locator('text=Sauce Labs Backpack').click();
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  await expect(page.getByText('$29.99')).toBeVisible();
  await page.goBack(); // optional to return to inventory
});

test('sauce labs bike light', async () => {
  await page.locator('text=Sauce Labs Bike Light').click();
  await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
  await expect(page.getByText('$9.99')).toBeVisible();
});
