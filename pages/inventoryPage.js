import { expect } from '@playwright/test';

export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  // Add an item directly from inventory using its test ID
  async addItemByTestId(itemTestId) {
    await this.page.locator(`[data-test="add-to-cart-${itemTestId}"]`).click();
  }

  // Open a product page, add item, and go back to products
  async addItemFromProductPage(itemLinkTestId, addButtonTestId) {
    await this.page.locator(`[data-test="${itemLinkTestId}"]`).click();
    await this.page.locator(`[data-test="${addButtonTestId}"]`).click();
    await this.page.locator('[data-test="back-to-products"]').click();
  }

  // Go to cart
  async goToCart() {
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/cart/);
  }

  cartItems() {
    return this.page.locator('.cart_item');
  }

  cartItemByName(itemName) {
    return this.page.locator('.inventory_item_name', { hasText: itemName });
  }
}
