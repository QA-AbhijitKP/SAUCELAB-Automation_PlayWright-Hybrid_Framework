import {Page, Locator, expect} from '@playwright/test';
import { CheckoutYourInformationPage } from './CheckoutYourInformationPage';
import { ProductPage } from './ProductPage';

export class YourCartPage{

    readonly page: Page;
    readonly pageName: Locator;
    readonly continueShoppingButton: Locator;
    readonly checkoutButton: Locator;
    readonly backpack: Locator;
    readonly bikeLight: Locator;
    readonly boltTShirt: Locator;
    readonly fleeceJacket: Locator;
    readonly onesie: Locator;
    readonly tShirtRed: Locator;





    constructor(page: Page){
        this.page= page;
        this.pageName= page.getByText('Your Cart', { exact: true });
        this.continueShoppingButton= page.getByText('Continue Shopping');
        this.checkoutButton= page.getByText('Checkout');
        this.backpack= page.getByText('Sauce Labs Backpack');
        this.bikeLight= page.getByText('Sauce Labs Bike Light');
        this.boltTShirt= page.getByText('Sauce Labs Bolt T-Shirt');
        this.fleeceJacket= page.getByText('Sauce Labs Fleece Jacket');
        this.onesie= page.getByText('Sauce Labs Onesie');
        this.tShirtRed= page.getByText('Test.allTheThings() T-Shirt (Red)');



    }


    // Verification Methods

    async verifyPageName(expectedTitle:string){
        await expect(this.pageName).toHaveText(expectedTitle);

    }

    async verifyCurrentURL(expectedURL:string){
        await expect(this.page).toHaveURL(expectedURL);
    }

    async verifyBackpackDisplayed(){
        await expect(this.backpack).toBeVisible();
    }



//-------------------------------------------------------------------------------------------------------------------
    
    // Product Actions: Generic Method

    async verifyProductDisplayed(productName: string) {
        await expect(this.page.getByText(productName)).toBeVisible();
    }

    async removeProduct(productName: string) {
        const productMap: Record<string, string> = {
            backPack: 'remove-sauce-labs-backpack',
            bikeLight: 'remove-sauce-labs-bike-light',
            boltTShirt: 'remove-sauce-labs-bolt-t-shirt',
            fleeceJacket: 'remove-sauce-labs-fleece-jacket',
            onesie: 'remove-sauce-labs-onesie',
            TShirtRed: 'remove-test.allthethings()-t-shirt-(red)'
        };

        const selectorName = productMap[productName];
        if (!selectorName) throw new Error(`Unknown product: ${productName}`);

        await this.page.locator(`[name="${selectorName}"]`).click();
    }


    
//-------------------------------------------------------------------------------------------------------------------

    // Navigation

    async clickContinueShoppingButton(){
        await expect(this.continueShoppingButton).toBeVisible();
        await this.continueShoppingButton.click();
        return new ProductPage(this.page);


    }


    
    async clickCheckoutButton(){
        await expect(this.checkoutButton).toBeVisible();
        await this.checkoutButton.click();
        return new CheckoutYourInformationPage(this.page);
    }


}
