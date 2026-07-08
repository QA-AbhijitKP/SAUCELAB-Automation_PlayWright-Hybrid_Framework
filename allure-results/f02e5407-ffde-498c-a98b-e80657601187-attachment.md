# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: end2EndTest.spec.ts >> Sauce Lab: End to End Test
- Location: src\tests\end2EndTest.spec.ts:12:5

# Error details

```
Error: page.goto: url: expected string, got undefined
```

# Test source

```ts
  1   | 
  2   | import { Page, Locator, expect } from '@playwright/test';
  3   | import { ProductPage } from './ProductPage';
  4   | import logger from '../logging/Logger';
  5   | 
  6   | export class LoginPage {
  7   | 
  8   |     readonly page: Page;
  9   |     readonly username: Locator;
  10  |     readonly password: Locator;
  11  |     readonly loginButton: Locator;
  12  |     readonly errorMessageInvalidCredetials: Locator;
  13  |     readonly errorMessageEmptyCredentials: Locator;
  14  | 
  15  |     constructor(page: Page) {
  16  |         this.page = page;
  17  |         this.username = page.locator('#user-name');
  18  |         this.password = page.locator('#password');
  19  |         this.loginButton = page.locator('#login-button');
  20  |         this.errorMessageInvalidCredetials = page.locator('[data-test="error"]');
  21  |         this.errorMessageEmptyCredentials = page.locator(':text("Epic sadface: Username is required")');
  22  |     }
  23  | 
  24  |     async gotoLoginPage(url: string) {
  25  |         logger.info(`Navigating to URL: ${url}`);
  26  | 
> 27  |         await this.page.goto(url);
      |                         ^ Error: page.goto: url: expected string, got undefined
  28  | 
  29  |         logger.info('Successfully launched application');
  30  |     }
  31  | 
  32  |     async verifyCurrentURL(expectedURL: string) {
  33  | 
  34  |         logger.info(`Verifying URL: ${expectedURL}`);
  35  | 
  36  |         await expect(this.page).toHaveURL(expectedURL);
  37  | 
  38  |         logger.info('URL verification passed');
  39  |     }
  40  | 
  41  |     async verifyPageTitle(expectedpageTitle: string) {
  42  | 
  43  |         logger.info(`Verifying Page Title: ${expectedpageTitle}`);
  44  | 
  45  |         await expect(this.page).toHaveTitle(expectedpageTitle);
  46  | 
  47  |         logger.info('Page title verification passed');
  48  |     }
  49  | 
  50  |     async login(username: string, password: string) {
  51  | 
  52  |         logger.info(`Entering Username: ${username}`);
  53  | 
  54  |         await this.username.fill(username);
  55  | 
  56  |         logger.info('Entering Password');
  57  | 
  58  |         await this.password.fill(password);
  59  | 
  60  |         logger.info('Clicking Login Button');
  61  | 
  62  |         await this.loginButton.click();
  63  | 
  64  |         logger.info('Login button clicked');
  65  |     }
  66  | 
  67  |     async verifyLoginSuccess() {
  68  | 
  69  |         logger.info('Verifying successful login');
  70  | 
  71  |         await expect(this.page).toHaveURL(
  72  |             'https://www.saucedemo.com/inventory.html'
  73  |         );
  74  | 
  75  |         logger.info('Login successful');
  76  | 
  77  |         return new ProductPage(this.page);
  78  |     }
  79  | 
  80  |     async verifyInvalidLogin(expectedError: string) {
  81  | 
  82  |         logger.warn('Verifying invalid login scenario');
  83  | 
  84  |         await expect(this.errorMessageInvalidCredetials)
  85  |             .toHaveText(expectedError);
  86  | 
  87  |         logger.warn(`Expected Error Displayed: ${expectedError}`);
  88  |     }
  89  | 
  90  |     async verifyEmptyLogin(expectedError: string) {
  91  | 
  92  |         logger.warn('Verifying empty login scenario');
  93  | 
  94  |         await expect(this.errorMessageEmptyCredentials)
  95  |             .toHaveText(expectedError);
  96  | 
  97  |         logger.warn(`Expected Error Displayed: ${expectedError}`);
  98  |     }
  99  | }
  100 | 
```