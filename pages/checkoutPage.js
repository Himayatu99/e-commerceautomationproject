import { expect } from '@playwright/test';

export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  // Start checkout from cart page
  async startCheckout() {
    await expect(this.checkoutButton).toBeVisible();
    await this.checkoutButton.click();
    await expect(this.page).toHaveURL(/checkout-step-one/);
  }

  // Fill checkout info
  async enterCheckoutInfo(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  // Click continue to go to overview
  async continueCheckout() {
    await expect(this.continueButton).toBeVisible();
    await this.continueButton.click();
  }

  // Click finish on checkout overview page
  async finishCheckout() {
    await expect(this.finishButton).toBeVisible();
    await this.finishButton.click();
  }

  // Return the Locator object for error messages
  getErrorMessage() {
    return this.errorMessage; 
  }
}
