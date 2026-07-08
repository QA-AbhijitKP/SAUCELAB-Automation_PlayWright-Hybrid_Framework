
import { Page, Locator, expect } from '@playwright/test';
import logger from '../logging/Logger';

export class ProductPage {

    readonly page: Page;
    readonly pageName: Locator;
    readonly sortProductButton: Locator;

    readonly previewProduct1: Locator;
    readonly previewProduct2: Locator;
    readonly previewProduct3: Locator;
    readonly previewProduct4: Locator;
    readonly previewProduct5: Locator;
    readonly previewProduct6: Locator;

    readonly products = {
        backpack: 'sauce-labs-backpack',
        bikeLight: 'sauce-labs-bike-light',
        boltTshirt: 'sauce-labs-bolt-t-shirt',
        fleeceJacket: 'sauce-labs-fleece-jacket',
        onesie: 'sauce-labs-onesie',
        redTshirt: 'test.allthethings()-t-shirt-(red)'
    };

    readonly addToCarButtonOnProductPreviewPage: Locator;
    readonly removeButtonOnProductPreviewPage: Locator;
    readonly backToProductButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.pageName = page.locator('[data-test="title"]');

        this.sortProductButton = page.locator('select.product_sort_container');

        this.previewProduct1 = page.locator(':text("Sauce Labs Backpack")');
        this.previewProduct2 = page.locator(':text("Sauce Labs Bike Light")');
        this.previewProduct3 = page.locator(':text("Sauce Labs Bolt T-Shirt")');
        this.previewProduct4 = page.locator(':text("Sauce Labs Fleece Jacket")');
        this.previewProduct5 = page.locator(':text("Sauce Labs Onesie")');
        this.previewProduct6 = page.locator(':text("Test.allTheThings() T-Shirt (Red)")');

        this.addToCarButtonOnProductPreviewPage = page.locator('button:has-text("Add to cart")');
        this.removeButtonOnProductPreviewPage = page.locator('button:has-text("Remove")');

        this.backToProductButton = page.locator('button[name="back-to-products"]');
    }

    async verifyPageTitle(expectedpageTitle: string) {

        logger.info(`Verifying Product Page Title: ${expectedpageTitle}`);

        await expect(this.pageName).toHaveText(expectedpageTitle);

        logger.info('Product Page Title verification passed');
    }

    async verifyCurrentURL(expectedURL: string) {

        logger.info(`Verifying Product Page URL: ${expectedURL}`);

        const actualURL = this.page.url();

        expect(actualURL).toBe(expectedURL);

        logger.info('Product Page URL verification passed');
    }

    async addProduct(productId: string) {

        logger.info(`Attempting to add product: ${productId}`);

        const addButton = this.page.locator(`[name="add-to-cart-${productId}"]`);
        const removeButton = this.page.locator(`[name="remove-${productId}"]`);

        if (await removeButton.isVisible()) {

            logger.warn(`Product already added to cart: ${productId}`);

            return;
        }

        await addButton.click();

        logger.info(`Product added successfully: ${productId}`);
    }

    async removeProduct(productId: string) {

        logger.info(`Attempting to remove product: ${productId}`);

        const removeButton = this.page.locator(`[name="remove-${productId}"]`);

        if (await removeButton.isVisible()) {

            await removeButton.click();

            logger.info(`Product removed successfully: ${productId}`);
        }
        else {

            logger.warn(`Product already removed: ${productId}`);
        }
    }
}
