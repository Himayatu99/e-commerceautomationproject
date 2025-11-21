import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventoryPage';

test.describe('Add to Cart Tests', () => {

  let inventoryPage;

  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/inventory/);

    // Initialize InventoryPage instance
    inventoryPage = new InventoryPage(page);
  });

  test('User can add multiple products to cart and view them in cart', async ({ page }) => {
    // Add items
    await inventoryPage.addItemFromProductPage('item-4-title-link', 'add-to-cart');
    await inventoryPage.addItemByTestId('sauce-labs-bike-light');
    await inventoryPage.addItemByTestId('sauce-labs-bolt-t-shirt');

    // Open cart
    await inventoryPage.goToCart();

    // Assertions
    await expect(inventoryPage.cartItems()).toHaveCount(3);
    await expect(inventoryPage.cartItemByName('Sauce Labs Backpack')).toBeVisible();
    await expect(inventoryPage.cartItemByName('Sauce Labs Bike Light')).toBeVisible();
    await expect(inventoryPage.cartItemByName('Sauce Labs Bolt T-Shirt')).toBeVisible();
  });

  test('Adding the same product twice updates the cart correctly', async ({ page }) => {
    await inventoryPage.addItemByTestId('sauce-labs-backpack');

    const badge = page.locator('.shopping_cart_badge');
    await expect(badge).toHaveText('1');

    const addButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    if (await addButton.isVisible()) {
      await addButton.click();
    }

    await inventoryPage.goToCart();

    // Assertion
    await expect(inventoryPage.cartItems()).toHaveCount(1);
  });
});
