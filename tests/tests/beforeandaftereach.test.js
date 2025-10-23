import {test, expect} from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.getByText('Swag Labs')).toBeVisible();
});

test.afterEach(async ({ page }) => {
    await page.getByRole('button', { name: 'Open Menu' }).click({ timeout: 120000 });
    await page.locator('[data-test="logout-sidebar-link"]').click();
    await expect(page.getByText('Swag Labs')).toBeVisible();
});


test('sauce labs back pack', async ({ page }) => {
    await page.locator('text=Sauce Labs Backpack').click();
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.getByText('$29.99')).toBeVisible();
});

test('sauce labs bike light', async ({ page }) => {
    await page.locator('text=Sauce Labs Bike Light').click();
    await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
    await expect(page.getByText('$9.99')).toBeVisible();
});