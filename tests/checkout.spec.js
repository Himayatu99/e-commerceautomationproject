import { test, expect } from '@playwright/test';

test.describe('Checkout Flow Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Login steps
        await page.goto('/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        // Verify login success
        await expect(page).toHaveURL(/inventory/);
    });

    // Positive Test – valid checkout
    test('User can successfully complete checkout with valid details', async ({ page }) => {
        //Add items to cart
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

        // Step 3: Go to cart
        await page.locator('[data-test="shopping-cart-link"]').click();
        await expect(page).toHaveURL(/cart/);

        // Step 4: Checkout
        await page.locator('[data-test="checkout"]').click();
        await expect(page).toHaveURL(/checkout-step-one/);

        // Step 5: Enter valid checkout info
        await page.locator('[data-test="firstName"]').fill('John');
        await page.locator('[data-test="lastName"]').fill('Doe');
        await page.locator('[data-test="postalCode"]').fill('12345');
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL(/checkout-step-two/);

        // Step 6: Finish order
        await page.locator('[data-test="finish"]').click();

        // Step 7: Verify order success
        await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
    });

    // Negative Test – missing required information
    test('Checkout fails when required information is missing', async ({ page }) => {

        // Add an item to cart
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

        //Go to cart
        await page.locator('[data-test="shopping-cart-link"]').click();
        await expect(page).toHaveURL(/cart/);

        //Click checkout
        await page.locator('[data-test="checkout"]').click();
        await expect(page).toHaveURL(/checkout-step-one/);

        //Leave required fields empty and click continue
        await page.locator('[data-test="firstName"]').fill('');
        await page.locator('[data-test="lastName"]').fill('');
        await page.locator('[data-test="postalCode"]').fill('');
        await page.locator('[data-test="continue"]').click();

        //Verify error message
        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toHaveText('Error: First Name is required');
    });

});
