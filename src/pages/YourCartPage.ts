
import { Page, Locator, expect } from '@playwright/test';
import { CheckoutYourInformationPage } from './CheckoutYourInformationPage';
import { ProductPage } from './ProductPage';
import logger from '../logging/Logger';

export class YourCartPage {

    readonly page: Page;
    readonly pageName: Locator;
    readonly continueShoppingButton: Locator;
    readonly checkoutButton: Locator;
    readonly backpack: Locator;
    readonly bikeLight: Locator;
    readonly boltTShirt: Locator;
    readonly fleeceJacket: Locator;
    readonly onesie: Locator;
    readonly tShirtRed: Locator;

    constructor(page: Page) {

        this.page = page;

        this.pageName = page.locator('span.title');

        this.continueShoppingButton = page.getByText('Continue Shopping');
        this.checkoutButton = page.getByText('Checkout');

        this.backpack = page.getByText('Sauce Labs Backpack');
        this.bikeLight = page.getByText('Sauce Labs Bike Light');
        this.boltTShirt = page.getByText('Sauce Labs Bolt T-Shirt');
        this.fleeceJacket = page.getByText('Sauce Labs Fleece Jacket');
        this.onesie = page.getByText('Sauce Labs Onesie');
        this.tShirtRed = page.getByText('Test.allTheThings() T-Shirt (Red)');
    }

    // Verification Methods

    async verifyPageName(expectedTitle: string) {

        logger.info(`Verifying Cart Page Title: ${expectedTitle}`);

        await expect(this.pageName).toHaveText(expectedTitle);

        logger.info('Cart Page Title verification passed');
    }

    async verifyCurrentURL(expectedURL: string) {

        logger.info(`Verifying Cart Page URL: ${expectedURL}`);

        await expect(this.page).toHaveURL(expectedURL);

        logger.info('Cart Page URL verification passed');
    }

    async verifyBackpackDisplayed() {

        logger.info('Verifying Backpack product is displayed');

        await expect(this.backpack).toBeVisible();

        logger.info('Backpack product is displayed');
    }

    // Product Actions

    async verifyProductDisplayed(productName: string) {

        logger.info(`Verifying product displayed in cart: ${productName}`);

        const productMap: Record<string, Locator> = {
            'sauce-labs-backpack': this.page.locator('a[id="item_4_title_link"] div.inventory_item_name'),
            'sauce-labs-bike-light': this.page.locator('a[id="item_0_title_link"] div.inventory_item_name'),
            'sauce-labs-bolt-t-shirt': this.page.locator('a[id="item_1_title_link"] div.inventory_item_name'),
            'sauce-labs-fleece-jacket': this.page.locator('a[id="item_5_title_link"] div.inventory_item_name'),
            'sauce-labs-onesie': this.page.locator('a[id="item_2_title_link"] div.inventory_item_name'),
            'test.allthethings()-t-shirt-(red)': this.page.locator('a[id="item_3_title_link"] div.inventory_item_name')
        };

        const locator = productMap[productName];

        if (!locator) {

            logger.error(`Unknown product supplied: ${productName}`);

            throw new Error(`Unknown product: ${productName}`);
        }

        await expect(locator).toBeVisible();

        logger.info(`Product verified successfully: ${productName}`);
    }

    async removeProduct(productName: string) {

        logger.info(`Removing product from cart: ${productName}`);

        const productMap: Record<string, string> = {
            'sauce-labs-backpack': 'remove-sauce-labs-backpack',
            'sauce-labs-bike-light': 'remove-sauce-labs-bike-light',
            'sauce-labs-bolt-t-shirt': 'remove-sauce-labs-bolt-t-shirt',
            'sauce-labs-fleece-jacket': 'remove-sauce-labs-fleece-jacket',
            'sauce-labs-onesie': 'remove-sauce-labs-onesie',
            'test.allthethings()-t-shirt-(red)': 'remove-test.allthethings()-t-shirt-(red)'
        };

        const selectorName = productMap[productName];

        if (!selectorName) {

            logger.error(`Unknown product supplied: ${productName}`);

            throw new Error(`Unknown product: ${productName}`);
        }

        await this.page.locator(`[name="${selectorName}"]`).click();

        logger.info(`Product removed successfully: ${productName}`);
    }

    // Navigation

    async clickContinueShoppingButton() {

        logger.info('Clicking Continue Shopping button');

        await expect(this.continueShoppingButton).toBeVisible();

        await this.continueShoppingButton.click();

        logger.info('Navigated back to Product Page');

        return new ProductPage(this.page);
    }

    async clickCheckoutButton() {

        logger.info('Clicking Checkout button');

        await expect(this.checkoutButton).toBeVisible();

        await this.checkoutButton.click();

        logger.info('Navigated to Checkout Information Page');

        return new CheckoutYourInformationPage(this.page);
    }
}
