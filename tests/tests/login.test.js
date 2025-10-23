// tests/login.test.js
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page.js';

test.describe('Login Tests', () => {
  test('standard user sign in', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.expectSwagLabsVisible();
    
    await loginPage.logout();
    await loginPage.expectSwagLabsVisible();
  });

  test('locked out user sign in', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');
    await loginPage.expectLockedOutError();
  });
});