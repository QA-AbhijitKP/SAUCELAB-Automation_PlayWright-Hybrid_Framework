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
        this.pageName = page.locator('[data-test="title"]');
        this.orderConfirmMessage1= page.getByText('Thank you for your order!');
        this.orderConfirmMessage2= page.getByText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');
        //page.locator('button[name="back-to-products"]');

    }

    
    async verifyCurrentURL(expectedURL: string){
        await expect(this.page).toHaveURL(expectedURL);
    }

    async verifyPageName(pageName: string){
        await expect(this.pageName).toHaveText(pageName);
    }

    async checkConfirmationMessage(message1: string, message2: string){
        await expect(this.orderConfirmMessage1).toHaveText(message1);
        await expect(this.orderConfirmMessage2).toHaveText(message2);
    }

    async clickBackHomeButton(){
        await expect(this.backHomeButton).toBeVisible();
        await this.backHomeButton.click();
        return new ProductPage(this.page);       
    }

}

// npx playwright test tests/Debug.spec.ts --debug