
import { Page, Locator, expect } from '@playwright/test';
import { ProductPage } from './ProductPage';
import logger from '../logging/Logger';

export class CheckoutCompletePage {

    readonly page: Page;
    readonly pageName: Locator;
    readonly orderConfirmMessage1: Locator;
    readonly orderConfirmMessage2: Locator;
    readonly backHomeButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.pageName = page.locator('[data-test="title"]');

        this.orderConfirmMessage1 = page.getByText(
            'Thank you for your order!'
        );

        this.orderConfirmMessage2 = page.getByText(
            'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
        );

        this.backHomeButton = page.locator('[data-test="back-to-products"]');
    }

    async verifyCurrentURL(expectedURL: string) {

        logger.info(`Verifying Checkout Complete URL: ${expectedURL}`);

        await expect(this.page).toHaveURL(expectedURL);

        logger.info('Checkout Complete URL verification passed');
    }

    async verifyPageName(pageName: string) {

        logger.info(`Verifying Checkout Complete Page Name: ${pageName}`);

        await expect(this.pageName).toHaveText(pageName);

        logger.info('Checkout Complete Page Name verification passed');
    }

    async checkConfirmationMessage(
        message1: string,
        message2: string
    ) {

        logger.info('Verifying Order Confirmation Messages');

        await expect(this.orderConfirmMessage1).toHaveText(message1);

        await expect(this.orderConfirmMessage2).toHaveText(message2);

        logger.info('Order Confirmation Messages verified successfully');
    }

    async clickBackHomeButton() {

        logger.info('Clicking Back Home Button');

        await expect(this.backHomeButton).toBeVisible();

        await this.backHomeButton.click();

        logger.info('Navigated back to Product Page');

        return new ProductPage(this.page);
    }
}
