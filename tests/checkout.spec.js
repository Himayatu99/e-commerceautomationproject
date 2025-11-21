import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventoryPage';
import { CheckoutPage } from '../pages/checkoutPage';

test.describe('Checkout Flow Tests', () => {
  let inventoryPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/inventory/);

    // Initialize POM
    inventoryPage = new InventoryPage(page);
    checkoutPage = new CheckoutPage(page);
  });

  // Positive Test – valid checkout
  test('User can successfully complete checkout with valid details', async ({ page }) => {
    // Add items to cart
    await inventoryPage.addItemByTestId('sauce-labs-backpack');
    await inventoryPage.addItemByTestId('sauce-labs-bike-light');

    // Go to cart and start checkout
    await inventoryPage.goToCart();
    await checkoutPage.startCheckout();

    // Enter checkout details
    await checkoutPage.enterCheckoutInfo('John', 'Doe', '12345');

    // Continue to overview
    await checkoutPage.continueCheckout();
    await expect(page).toHaveURL(/checkout-step-two/); // URL check only for positive flow

    // Finish order
    await checkoutPage.finishCheckout();

    // Verify success
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
  });

  // Negative Test – missing required information
  test('Checkout fails when required information is missing', async ({ page }) => {
    // Add item to cart
    await inventoryPage.addItemByTestId('sauce-labs-backpack');

    // Go to cart and start checkout
    await inventoryPage.goToCart();
    await checkoutPage.startCheckout();

    // Leave fields empty
    await checkoutPage.enterCheckoutInfo('', '', '');

    // Click continue (no URL navigation expected)
    await checkoutPage.continueCheckout();

    // Verify error message
    await expect(checkoutPage.getErrorMessage()).toHaveText('Error: First Name is required');
  });
});
