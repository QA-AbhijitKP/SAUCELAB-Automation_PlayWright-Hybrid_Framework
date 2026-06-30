import {Page, Locator, expect} from '@playwright/test';
import { ProductPage } from './ProductPage';

export class CheckoutCompletePage{

    readonly page: Page;
    readonly pageName: Locator;
    readonly orderConfirmMessage1: Locator;
    readonly orderConfirmMessage2: Locator;
    readonly backHomeButton: Locator;
    

    constructor(page: Page){
        this.page = page;
        this.pageName = page.getByText('Checkout: Complete!');
        this.orderConfirmMessage1= page.getByText('Thank you for your order!');
        this.orderConfirmMessage2= page.getByText('Your order has been dispatched, and will arrive just as fast as the pony can get there!', { exact: true });
        this.backHomeButton= page.locator('button:has-text("Back Home")');

    }

    async verifyCurrentURL(expectedURL: string){
        const actualURL = this.page.url();
        expect(actualURL).toBe(expectedURL);
    }

    async verifyPageName(PageName: string){
        expect(this.pageName).toHaveText(PageName);
        
    }

    async checkConfirmationMessage(Message1: string, Message2: string){
        expect(this.orderConfirmMessage1).toHaveText(Message1);
        expect(this.orderConfirmMessage2).toHaveText(Message2);
        
    }

    async clickBackHomeButton(){
        await expect(this.backHomeButton).toBeVisible();
        await this.backHomeButton.click();
        return new ProductPage(this.page);

        
    }

}