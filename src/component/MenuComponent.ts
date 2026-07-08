
import { Page, Locator } from '@playwright/test';
import logger from '../logging/Logger';

export class MenuComponent {

    readonly page: Page;

    // Header: Hamburger Menu Options
    readonly hamburgerIcon: Locator;
    readonly allItemsOption: Locator;
    readonly aboutOption: Locator;
    readonly logoutOption: Locator;
    readonly resetAppStateOption: Locator;

    constructor(page: Page) {

        this.page = page;

        this.hamburgerIcon = page.locator('#react-burger-menu-btn');
        this.allItemsOption = page.locator(':text("All Items")');
        this.aboutOption = page.locator(':text("About")');
        this.logoutOption = page.locator(':text("Logout")');
        this.resetAppStateOption = page.locator(':text("Reset App State")');
    }

    async clickAllItemsOption() {

        logger.info('Opening Hamburger Menu');

        await this.hamburgerIcon.click();

        logger.info('Clicking All Items option');

        await this.allItemsOption.click();

        logger.info('Successfully navigated via All Items option');
    }

    async clickAboutOption() {

        logger.info('Opening Hamburger Menu');

        await this.hamburgerIcon.click();

        logger.info('Clicking About option');

        await this.aboutOption.click();

        logger.info('Successfully navigated to About page');
    }

    async clickLogoutOption() {

        logger.info('Opening Hamburger Menu');

        await this.hamburgerIcon.click();

        logger.info('Clicking Logout option');

        await this.logoutOption.click();

        logger.info('Successfully logged out from application');
    }

    async clickResetAppStateOption() {

        logger.info('Opening Hamburger Menu');

        await this.hamburgerIcon.click();

        logger.info('Clicking Reset App State option');

        await this.resetAppStateOption.click();

        logger.info('Application state reset successfully');
    }
}
