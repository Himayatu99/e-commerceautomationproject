import { test, expect } from '@playwright/test';

// Invalid Login Test
test('User cannot login with invalid credentials', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('wrongPassword123');
    await page.locator('[data-test="login-button"]').click();

    await expect(page.locator('[data-test="error"]'))
        .toHaveText('Epic sadface: Username and password do not match any user in this service');
});

// Valid Login Test
test('User can login with valid credentials', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Assertion: Successful login leads to products page
    await expect(page.locator('.title')).toHaveText('Products');
});
