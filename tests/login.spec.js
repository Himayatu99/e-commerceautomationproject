import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test.describe('Login Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('User cannot login with invalid credentials', async ({ page }) => {
    await loginPage.login('standard_user', 'wrongPassword123');
    await loginPage.expectError('Epic sadface: Username and password do not match any user in this service');
  });

  test('User can login with valid credentials', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.expectTitle('Products'); 
  });
});
