import { test, expect } from '@playwright/test';

test.describe('Add to Cart Tests', () => {

    // Runs before each test in this describe block
    test.beforeEach(async ({ page }) => {
        // Login
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        // Verify login success
        await expect(page).toHaveURL(/inventory/);
    });

    // Positive Test: Add multiple products
    test('User can add multiple products to cart and view them in cart', async ({ page }) => {
        // Add items
        await page.locator('[data-test="item-4-title-link"]').click();
        await page.locator('[data-test="add-to-cart"]').click();
        await page.locator('[data-test="back-to-products"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

        // Open cart
        await page.locator('[data-test="shopping-cart-link"]').click();

        // Assertions
        const cartItems = page.locator('.cart_item');
        await expect(cartItems).toHaveCount(3);
        await expect(page.locator('.inventory_item_name', { hasText: 'Sauce Labs Backpack' })).toBeVisible();
        await expect(page.locator('.inventory_item_name', { hasText: 'Sauce Labs Bike Light' })).toBeVisible();
        await expect(page.locator('.inventory_item_name', { hasText: 'Sauce Labs Bolt T-Shirt' })).toBeVisible();
    });

    // Negative Test: Adding same product twice
    test('Adding the same product twice updates the cart correctly', async ({ page }) => {
        // Add item once
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

        let badge = page.locator('.shopping_cart_badge');
        await expect(badge).toHaveText('1');

        const addButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        if (await addButton.isVisible()) {
            await addButton.click();
        }

        // Open cart
        await page.locator('[data-test="shopping-cart-link"]').click();

        // Assertion: Cart still has 1 item
        const cartItems = page.locator('.cart_item');
        await expect(cartItems).toHaveCount(1);
    });


});
