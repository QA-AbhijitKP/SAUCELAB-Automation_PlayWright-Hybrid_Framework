
import { Page, Locator, expect } from '@playwright/test';
import logger from '../logging/Logger';

export class HeaderComponent {

    readonly page: Page;

    // Logo
    readonly logoText: Locator;

    // Cart Icon & Badge
    readonly shoppingCartIcon: Locator;
    readonly numberOnCartIcon: Locator;

    constructor(page: Page) {

        this.page = page;

        this.logoText = page.locator('div.app_logo');
        this.shoppingCartIcon = page.locator('a.shopping_cart_link:visible');
        this.numberOnCartIcon = page.locator('span.shopping_cart_badge');
    }

    // Logo Verification

    async verifyLogo(expectedText: string) {

        logger.info(`Verifying Logo Text: ${expectedText}`);

        await expect(this.logoText).toHaveText(expectedText);

        logger.info('Logo verification passed');
    }

    // Cart Actions

    async openCart() {

        logger.info('Opening Shopping Cart');

        await this.shoppingCartIcon.click();

        logger.info('Shopping Cart opened successfully');
    }

    async getCartCount(): Promise<number> {

        logger.info('Getting Cart Item Count');

        if (!(await this.numberOnCartIcon.isVisible())) {

            logger.info('Cart is empty. Item count: 0');

            return 0;
        }

        const countText = await this.numberOnCartIcon.textContent();
        const count = Number(countText?.trim() ?? '0');

        logger.info(`Cart Item Count: ${count}`);

        return count;
    }

    async verifyCountOnCart(expectedCount: number) {

        logger.info(`Verifying Cart Count: ${expectedCount}`);

        await expect(this.numberOnCartIcon).toHaveText(
            expectedCount.toString()
        );

        logger.info('Cart Count verification passed');
    }
}
