// pages/login.page.js
import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.swagLabsText = page.getByText('Swag Labs');
    this.openMenuButton = page.getByRole('button', { name: 'Open Menu' });
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    this.errorMessage = page.getByText('Epic sadface: Sorry, this user has been locked out.');
  }

  // Actions
  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username, password) {
    await this.usernameInput.click();
    await this.usernameInput.fill(username);
    await this.passwordInput.click();
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async logout() {
    await this.openMenuButton.click({ timeout: 120000 });
    await this.logoutLink.click();
  }

  // Assertions
  async expectSwagLabsVisible() {
    await expect(this.swagLabsText).toBeVisible();
  }

  async expectLockedOutError() {
    await expect(this.errorMessage).toBeVisible();
  }
}