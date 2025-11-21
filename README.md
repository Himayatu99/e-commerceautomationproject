E-commerce Automation Tests (Playwright)
Overview

This project contains end-to-end UI automation tests for a sample e-commerce site using Playwright.

The tests cover:

User login (valid & invalid credentials)

Add to cart functionality

Checkout process (positive & negative scenarios)

HTML test reporting

Cross-browser testing (Chromium, Firefox, WebKit)

Screenshots & video capture on test failures

Framework Choice

We chose Playwright because it:

Supports both UI and API automation

Is fast and reliable

Provides cross-browser and mobile testing support

Has built-in reporting, screenshots, and tracing capabilities

Project Structure
e-commerceautomationproject/
├─ pages/               # Page Object Model (POM) classes
│  ├─ inventoryPage.js
│  ├─ checkoutPage.js
│  └─ loginPage.js
├─ tests/               # Playwright test specifications
│  ├─ login.spec.js
│  ├─ addcard.spec.js
│  └─ checkout.spec.js
├─ playwright.config.js # Playwright configuration
├─ package.json
└─ .github/workflows/  # GitHub Actions CI/CD pipeline

Setup Instructions
1. Clone Repository
git clone https://github.com/Himayatu99/e-commerceautomationproject.git
cd e-commerceautomationproject

2. Install Dependencies
npm install
npx playwright install

3. Run Tests Locally
npx playwright test               # Run all tests
npx playwright test --headed      # Run tests with browser UI
npx playwright test --project=firefox  # Run tests in Firefox
npx playwright show-report        # Open HTML report

Configuration

Base URL: Set in playwright.config.js

Browsers: Chromium, Firefox, WebKit

Retries: Configured for CI/CD pipelines

Reports: HTML reports saved in playwright-report/

CI/CD with GitHub Actions

The project is configured to run tests automatically on GitHub Actions:

Key Features:

Runs tests on every push and pull request

Executes tests across all supported browsers

Generates HTML test reports

Captures screenshots, videos, and traces for failed tests

Uploads artifacts for debugging and analysis