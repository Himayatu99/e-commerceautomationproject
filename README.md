E-commerce Automation Tests (Playwright)
Overview

This project contains end-to-end UI automation tests for a sample e-commerce site using Playwright.
Tests cover:

User login (valid & invalid)
Add to cart functionality
Checkout (positive & negative scenarios)

HTML test reporting

Cross-browser testing (Chromium, Firefox, WebKit)

Screenshots & video capture on failure

Framework Choice

We used Playwright because:

Supports UI and API automation

Fast and reliable

Cross-browser and mobile testing support

Built-in reporting, screenshots, and tracing

Project Structure
e-commerceautomationproject/
├─ pages/               # Page Object Model classes
│  ├─ inventoryPage.js
│  ├─ checkoutPage.js
│  └─ loginPage.js
├─ tests/               # Playwright test specs
│  ├─ login.spec.js
│  ├─ addcard.spec.js
│  └─ checkout.spec.js
├─ playwright.config.js # Playwright configuration
├─ package.json
└─ .github/workflows/  # CI/CD pipeline for GitHub Actions

Setup Instructions
1. Clone Repository
git clone https://github.com/Himayatu99/e-commerceautomationproject.git
cd e-commerceautomationproject

2. Install Dependencies
npm install
npx playwright install

3. Run Tests Locally
npx playwright test            # Run all tests
npx playwright test --headed   # Run tests with browser UI
npx playwright test --project=firefox  # Run tests in Firefox
npx playwright show-report     # Open HTML report

4. Configuration

Base URL: Set in playwright.config.js

Browsers: Chromium, Firefox, WebKit

Retries: Configured for CI

Reports: HTML reports saved in playwright-report/

CI/CD with GitHub Actions

Key Features in CI:

Runs tests on every push and pull request

Executes across all browsers

Generates HTML report

Captures screenshots, videos, and traces for failed tests

Artifacts are uploaded for debugging
