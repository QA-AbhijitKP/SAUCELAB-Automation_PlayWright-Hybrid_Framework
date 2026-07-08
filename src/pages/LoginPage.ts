
import { Page, Locator, expect } from '@playwright/test';
import { ProductPage } from './ProductPage';
import logger from '../logging/Logger';

export class LoginPage {

    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly errorMessageInvalidCredetials: Locator;
    readonly errorMessageEmptyCredentials: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessageInvalidCredetials = page.locator('[data-test="error"]');
        this.errorMessageEmptyCredentials = page.locator(':text("Epic sadface: Username is required")');
    }

    async gotoLoginPage(url: string) {
        logger.info(`Navigating to URL: ${url}`);

        await this.page.goto(url);

        logger.info('Successfully launched application');
    }

    async verifyCurrentURL(expectedURL: string) {

        logger.info(`Verifying URL: ${expectedURL}`);

        await expect(this.page).toHaveURL(expectedURL);

        logger.info('URL verification passed');
    }

    async verifyPageTitle(expectedpageTitle: string) {

        logger.info(`Verifying Page Title: ${expectedpageTitle}`);

        await expect(this.page).toHaveTitle(expectedpageTitle);

        logger.info('Page title verification passed');
    }

    async login(username: string, password: string) {

        logger.info(`Entering Username: ${username}`);

        await this.username.fill(username);

        logger.info('Entering Password');

        await this.password.fill(password);

        logger.info('Clicking Login Button');

        await this.loginButton.click();

        logger.info('Login button clicked');
    }

    async verifyLoginSuccess() {

        logger.info('Verifying successful login');

        await expect(this.page).toHaveURL(
            'https://www.saucedemo.com/inventory.html'
        );

        logger.info('Login successful');

        return new ProductPage(this.page);
    }

    async verifyInvalidLogin(expectedError: string) {

        logger.warn('Verifying invalid login scenario');

        await expect(this.errorMessageInvalidCredetials)
            .toHaveText(expectedError);

        logger.warn(`Expected Error Displayed: ${expectedError}`);
    }

    async verifyEmptyLogin(expectedError: string) {

        logger.warn('Verifying empty login scenario');

        await expect(this.errorMessageEmptyCredentials)
            .toHaveText(expectedError);

        logger.warn(`Expected Error Displayed: ${expectedError}`);
    }
}
