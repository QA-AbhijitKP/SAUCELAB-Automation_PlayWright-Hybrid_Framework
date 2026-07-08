
import { Page, Locator, expect } from '@playwright/test';
import logger from '../logging/Logger';

export class FooterComponent {

    readonly page: Page;

    // Footer Web Elements
    readonly twitterIcon: Locator;
    readonly facebookIcon: Locator;
    readonly linkedInIcon: Locator;
    readonly footerText: Locator;

    constructor(page: Page) {

        this.page = page;

        this.twitterIcon = page.locator(':text("Twitter")');
        this.facebookIcon = page.locator(':text("Facebook")');
        this.linkedInIcon = page.locator(':text("LinkedIn")');

        this.footerText = page.locator(
            ':text("© 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy")'
        );
    }

    async openTwitterPage() {

        logger.info('Opening Twitter Page');

        await this.twitterIcon.click();

        logger.info('Twitter Page opened successfully');
    }

    async openFacebookPage() {

        logger.info('Opening Facebook Page');

        await this.facebookIcon.click();

        logger.info('Facebook Page opened successfully');
    }

    async openLinkedInPage() {

        logger.info('Opening LinkedIn Page');

        await this.linkedInIcon.click();

        logger.info('LinkedIn Page opened successfully');
    }

    async verifyFooterText(expectedFooter: string) {

        logger.info('Verifying Footer Text');

        await expect(this.footerText).toHaveText(expectedFooter);

        logger.info('Footer Text verification passed');
    }
}
