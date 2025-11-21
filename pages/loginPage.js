import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator('[data-test="username"]');
    this.password = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.title = page.locator('.title');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async expectError(message) {
    await expect(this.errorMessage).toHaveText(message);
  }

  async expectTitle(titleText) {
    await expect(this.title).toHaveText(titleText);
  }
}
