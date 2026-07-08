import {Page, Locator, expect} from '@playwright/test';
import { CheckoutCompletePage } from './CheckoutCompletePage';
import { CheckoutYourInformationPage } from './CheckoutYourInformationPage';
import { ProductPage } from './ProductPage';
import logger from '../logging/Logger';

export class CheckoutOverviewPage{

    readonly page: Page;
    readonly pageName: Locator;
    
    readonly paymentInfo: Locator;
    readonly paymentInfoValue: Locator;
    readonly shippingInfo: Locator;
    readonly shippingInfoValue: Locator;
    readonly itemCost: Locator;
    //readonly itemCostValue: Locator;
    readonly taxCost: Locator;
    //readonly taxCostValue: Locator;
    readonly totalCost: Locator;
    //readonly totalCostValue: Locator;
    
    readonly cancelButton: Locator;
    readonly finishButton: Locator;



    constructor(page: Page){
        this.page= page;
        this.pageName= page.locator('[data-test="title"]');  
        
        this.paymentInfo = page.locator('[data-test="payment-info-label"]');
        this.paymentInfoValue= page.locator('[data-test="payment-info-value"]');

        this.shippingInfo = page.locator('[data-test="shipping-info-label"]');
        this.shippingInfoValue= page.locator('[data-test="shipping-info-value"]');

        this.itemCost = page.locator('[data-test="subtotal-label"]');
        //this.itemCostValue= page.locator('[data-test="subtotal-value"]');

        this.taxCost = page.locator('[data-test="tax-label"]');
        //this.taxCostValue= page.locator('[data-test="tax-value"]');

        this.totalCost = page.locator('[data-test="total-label"]');
        //this.totalCostValue= page.locator('[data-test="total-value"]');

        
        
        this.cancelButton= page.locator('[data-test="cancel"]');
        this.finishButton= page.locator('[data-test="finish"]');

    }

    
    async verifyPageName(expectedName: string) {

        logger.info(`Verifying Checkout Overview Page Name: ${expectedName}`);

        await expect(this.pageName).toHaveText(expectedName);

        logger.info('Checkout Overview Page Name verification passed');
    }

    
    
    async verifyCurrentURL(expectedURL: string) {

        logger.info(`Verifying Checkout Overview URL: ${expectedURL}`);

        await expect(this.page).toHaveURL(expectedURL);

        logger.info('Checkout Overview URL verification passed');
    }

    
    
    async verifyPaymentInfoDisplayed() {

        logger.info('Verifying Payment Information section');

        await expect(this.paymentInfo).toBeVisible();
        await expect(this.paymentInfoValue).toBeVisible();

        logger.info('Payment Information displayed successfully');
    }


    
    async verifyShippingInfoDisplayed() {

        logger.info('Verifying Shipping Information section');

        await expect(this.shippingInfo).toBeVisible();
        await expect(this.shippingInfoValue).toBeVisible();

        logger.info('Shipping Information displayed successfully');
    }


    
    async verifyCostDetailsDisplayed() {

        logger.info('Verifying Cost Details section');

        await expect(this.itemCost).toBeVisible();
        await expect(this.taxCost).toBeVisible();
        await expect(this.totalCost).toBeVisible();

        logger.info('Cost Details displayed successfully');
    }
   
    

    
    async validateTotalCost() {

        logger.info('Validating Total Cost');

        const itemTotalText = await this.page
            .locator('[data-test="subtotal-label"]')
            .textContent();

        const taxText = await this.page
            .locator('[data-test="tax-label"]')
            .textContent();

        const totalText = await this.page
            .locator('[data-test="total-label"]')
            .textContent();

        const itemTotal = Number(
            itemTotalText?.replace('Item total: $', '')
        );

        const tax = Number(
            taxText?.replace('Tax: $', '')
        );

        const actualTotal = Number(
            totalText?.replace('Total: $', '')
        );

        const expectedTotal = itemTotal + tax;

        expect(actualTotal).toBeCloseTo(expectedTotal, 2);

        logger.info(`Item Total: ${itemTotal}`);
        logger.info(`Tax: ${tax}`);
        logger.info(`Expected Total: ${expectedTotal}`);
        logger.info(`Actual Total: ${actualTotal}`);

        logger.info('Total Cost validation passed');
    }


    // Navigate pages
    
    async navigateToCheckoutCompletePage() {

        logger.info('Clicking Finish Button');

        await expect(this.finishButton).toBeVisible();

        await this.finishButton.click();

        logger.info('Navigated to Checkout Complete Page');

        return new CheckoutCompletePage(this.page);
    }

    
    async clickCancelButton() {

        logger.info('Clicking Cancel Button');

        await expect(this.cancelButton).toBeVisible();

        await this.cancelButton.click();

        logger.info('Navigated back to Product Page');

        return new ProductPage(this.page);
    }


}

// npx playwright test tests/Debug.spec.ts --project=chromium --debug