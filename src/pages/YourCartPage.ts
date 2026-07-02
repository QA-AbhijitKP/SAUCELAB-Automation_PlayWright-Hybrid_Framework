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
        this.pageName= page.locator('span.title');

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

        // Map of product names to their corresponding locators
        const productMap: Record<string, Locator> = {
            'sauce-labs-backpack': this.page.locator('a[id="item_4_title_link"] div.inventory_item_name'),
            'sauce-labs-bike-light': this.page.locator('a[id="item_0_title_link"] div.inventory_item_name'),
            'sauce-labs-bolt-t-shirt': this.page.locator('a[id="item_1_title_link"] div.inventory_item_name'),
            'sauce-labs-fleece-jacket': this.page.locator('a[id="item_5_title_link"] div.inventory_item_name'),
            'sauce-labs-onesie': this.page.locator('a[id="item_2_title_link"] div.inventory_item_name'),
            'test.allthethings()-t-shirt-(red)': this.page.locator('a[id="item_3_title_link"] div.inventory_item_name')
        };
        //await expect(productMap[productName]).toBeVisible();
        
        const locator = productMap[productName];

        if (!locator) {
            throw new Error(`Unknown product: ${productName}`);
        }

        await expect(locator).toBeVisible();

    }


    async removeProduct(productName: string) {
        const productMap: Record<string, string> = {
            'sauce-labs-backpack': 'remove-sauce-labs-backpack',
            'sauce-labs-bike-light': 'remove-sauce-labs-bike-light',
            'sauce-labs-bolt-t-shirt': 'remove-sauce-labs-bolt-t-shirt',
            'sauce-labs-fleece-jacket': 'remove-sauce-labs-fleece-jacket',
            'sauce-labs-onesie': 'remove-sauce-labs-onesie',
            'test.allthethings()-t-shirt-(red)': 'remove-test.allthethings()-t-shirt-(red)'
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
