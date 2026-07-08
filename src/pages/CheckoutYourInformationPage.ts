
import { Page, Locator, expect } from '@playwright/test';
import { CheckoutOverviewPage } from './CheckoutOverview';
import { YourCartPage } from './YourCartPage';
import logger from '../logging/Logger';

export class CheckoutYourInformationPage {

    readonly page: Page;
    readonly pageName: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly zipCode: Locator;
    readonly cancelButton: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.pageName = page.getByText('Checkout: Your Information');
        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.zipCode = page.locator("//input[@id='postal-code']");
        this.cancelButton = page.getByText('Cancel');
        this.continueButton = page.locator("//input[@id='continue']");
    }

    async verifyPageName(expectedText: string) {

        logger.info(`Verifying Page Name: ${expectedText}`);

        await expect(this.pageName).toHaveText(expectedText);

        logger.info('Checkout Information Page Name verification passed');
    }

    async verifyCurrentURL(expectedURL: string) {

        logger.info(`Verifying URL: ${expectedURL}`);

        await expect(this.page).toHaveURL(expectedURL);

        logger.info('Checkout Information URL verification passed');
    }

    async fillUserDetails(
        firstName: string,
        lastName: string,
        zipCode: string
    ) {

        logger.info('Entering Checkout Information');

        logger.info(`First Name: ${firstName}`);

        await this.firstName.click();
        await this.page.keyboard.type(firstName);

        await this.page.keyboard.press('Tab');

        logger.info(`Last Name: ${lastName}`);

        await this.page.keyboard.type(lastName);

        await this.page.keyboard.press('Tab');

        logger.info(`Zip Code: ${zipCode}`);

        await this.page.keyboard.type(zipCode);

        logger.info('Checkout Information entered successfully');
    }

    async verifyAllFieldsHaveValue() {

        logger.info('Verifying all checkout fields contain values');

        await expect(this.firstName).toHaveValue(/.+/);
        await expect(this.lastName).toHaveValue(/.+/);
        await expect(this.zipCode).toHaveValue(/.+/);

        logger.info('All checkout fields contain valid values');
    }

    // Navigation

    async clickCancelButton() {

        logger.info('Clicking Cancel Button');

        await expect(this.cancelButton).toBeVisible();

        await this.cancelButton.click();

        logger.info('Navigated back to Cart Page');

        return new YourCartPage(this.page);
    }

    async clickContinueButton() {

        logger.info('Clicking Continue Button');

        await expect(this.continueButton).toBeVisible();

        await this.continueButton.click();

        await this.page.waitForURL('**/checkout-step-two.html');

        logger.info('Navigated to Checkout Overview Page');

        return new CheckoutOverviewPage(this.page);
    }
}
