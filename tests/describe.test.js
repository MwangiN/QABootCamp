import { test, expect } from '@playwright/test';
import { describe } from 'node:test';


describe('Basic test for Sauce Demo', () => {
    test('visit saucedemo', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(page.getByText('Swag Labs')).toBeVisible();
        await expect(page).toHaveTitle('Swag Labs', { timeout: 120000 });
    });
});

describe('Sauce Demo different users sign ins', () => {
    test('standard user sign in', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').click();
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').click();
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        await expect(page.getByText('Swag Labs')).toBeVisible();

        await page.getByRole('button', { name: 'Open Menu' }).click({ timeout: 120000 });
        await page.locator('[data-test="logout-sidebar-link"]').click();
    
        await expect(page.getByText('Swag Labs')).toBeVisible();
        });

    test('locked out user sign in', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/', { timeout: 120000 });
        await page.locator('[data-test="username"]').click();
        await page.locator('[data-test="username"]').fill('locked_out_user');
        await page.locator('[data-test="password"]').click();
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();
    });
    });
