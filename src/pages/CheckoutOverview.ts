import {Page, Locator, expect} from '@playwright/test';
import { CheckoutCompletePage } from './CheckoutCompletePage';
import { CheckoutYourInformationPage } from './CheckoutYourInformationPage';
import { ProductPage } from './ProductPage';

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

    async verifyPageName(expectedName:string){
        await expect(this.pageName).toHaveText(expectedName);

    }
    
    async verifyCurrentURL(expectedURL: string) {
        await expect(this.page).toHaveURL(expectedURL);
    }
    
    async verifyPaymentInfoDisplayed(){
        await expect(this.paymentInfo).toBeVisible();
        await expect(this.paymentInfoValue).toBeVisible();
    }

    async verifyShippingInfoDisplayed(){
        await expect(this.shippingInfo).toBeVisible();
        await expect(this.shippingInfoValue).toBeVisible();
    }

    async verifyCostDetailsDisplayed(){
        await expect(this.itemCost).toBeVisible();
        
        await expect(this.taxCost).toBeVisible();
        
        await expect(this.totalCost).toBeVisible();
        
    }
    
    
    

    async validateTotalCost() {
        // Extract values from UI
        const itemTotalText = await this.page.locator('[data-test="subtotal-label"]').textContent();
        const taxText = await this.page.locator('[data-test="tax-label"]').textContent();
        const totalText = await this.page.locator('[data-test="total-label"]').textContent();

        // Remove text and convert to numbers
        const itemTotal = Number(itemTotalText?.replace('Item total: $', ''));
        const tax = Number(taxText?.replace('Tax: $', ''));
        const actualTotal = Number(totalText?.replace('Total: $', ''));

        // Calculate expected total
        const expectedTotal = itemTotal + tax;

        // Validate
        expect(actualTotal).toBeCloseTo(expectedTotal, 2);

        console.log(`Item Total: ${itemTotal}`);
        console.log(`Tax: ${tax}`);
        console.log(`Expected Total: ${expectedTotal}`);
        console.log(`Actual Total: ${actualTotal}`);
    }


    // Navigate pages

    
    async navigateToCheckoutCompletePage() {
        await expect(this.finishButton).toBeVisible();
        await this.finishButton.click();

        return new CheckoutCompletePage(this.page);
    }


    async clickCancelButton(){
        
        await expect(this.cancelButton).toBeVisible();
        await this.cancelButton.click();
        return new ProductPage(this.page);
        
    }

   


}

// npx playwright test tests/Debug.spec.ts --project=chromium --debug