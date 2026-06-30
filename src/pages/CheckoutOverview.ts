import {Page, Locator, expect} from '@playwright/test';
import { CheckoutCompletePage } from './CheckoutCompletePage';
import { CheckoutYourInformationPage } from './CheckoutYourInformationPage';

export class CheckoutOverviewPage{

    readonly page: Page;
    readonly pageName: Locator;
    readonly paymentInfo: Locator;
    readonly shippingInfo: Locator;
    readonly itemCost: Locator;
    readonly TaxCost: Locator;
    readonly totalCost: Locator;
    readonly cancelButton: Locator;
    readonly finishButton: Locator;



    constructor(page: Page){
        this.page= page;
        this.pageName= page.locator('span').filter({ hasText: 'Checkout: Overview' });
        this.paymentInfo= page.locator('[data-test="payment-info-value"]');
        this.shippingInfo= page.locator('[data-test="shipping-info-value"]');
        this.itemCost=page.locator('div.summary_subtotal_label:visible');
        this.TaxCost= page.locator('div.summary_tax_label:visible');
        this.totalCost= page.locator('div.summary_total_label:visible');
        this.cancelButton= page.locator('button').filter({ hasText: 'Cancel' });
        this.finishButton= page.locator('button').filter({ hasText: 'Finish' });



    }
    async verifyPageName(expectedName:string){
        expect(this.pageName).toHaveText(expectedName);

    }

    async verifyCurrentURL(expectedURL:string){
        const actualURL = this.page.url();
        expect(actualURL).toBe(expectedURL);
    }

    
    async verifyPaymentInfoDisplayed(){
        await expect(this.paymentInfo).toBeVisible();
    }

    async verifyShippingInfoDisplayed(){
        await expect(this.shippingInfo).toBeVisible();
    }

    async verifyCostDetailsDisplayed(){
        await expect(this.itemCost).toBeVisible();
        await expect(this.TaxCost).toBeVisible();
        await expect(this.totalCost).toBeVisible();
    }
    
    
    
    async verifyTotalAmount() {
        
    const itemTotalText = await this.itemCost.textContent();
    const taxText = await this.TaxCost.textContent();
    const totalText = await this.totalCost.textContent();

    const itemTotal = this.getAmount(itemTotalText ?? '');
    const tax = this.getAmount(taxText ?? '');
    const total = this.getAmount(totalText ?? '');

    expect(total).toBe(itemTotal + tax);
}
   
    private getAmount(text: string): number {
        // Extract the first number (with optional currency symbol) and parse as float
        const match = text.match(/-?\d{1,3}(?:[,\s]\d{3})*(?:\.\d+)?|-?\d+\.\d+/);
        if (!match) return 0;
        // Remove commas and spaces, then parse
        const normalized = match[0].replace(/[,\s]/g, '');
        const value = parseFloat(normalized);
        return Number.isNaN(value) ? 0 : value;
    }

    // Navigate pages

    async navigateToCheckoutCompletePage(){
        await expect(this.finishButton).toBeVisible();
        await this.finishButton.click();
        return new CheckoutYourInformationPage(this.page);
        
    }

    async navigateToCheckoutYourInformationPage(){
        
        await expect(this.cancelButton).toBeVisible();
        await this.cancelButton.click();
        return new CheckoutCompletePage(this.page);
        
    }

   


}