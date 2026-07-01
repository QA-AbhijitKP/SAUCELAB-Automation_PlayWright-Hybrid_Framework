import {Page, Locator, expect} from '@playwright/test'


export class ProductPage{

    readonly page: Page;

    // Sort the Products
    readonly sortProductButton: Locator;
    


    //Product Details : Add to Cart & Remove option on Home Page & Product Preview page
    /*
    Product1= Sauce Labs Backpack
    Product2= Sauce Labs Bike Light
    Product3= Sauce Labs Bolt T-Shirt
    Product4= Sauce Labs Fleece Jacket
    Product5= Sauce Labs Onesie
    Product6= Test.allTheThings() T-Shirt (Red)
    */
    readonly previewProduct1: Locator;

    readonly previewProduct2: Locator;

    readonly previewProduct3: Locator;
    
    readonly previewProduct4: Locator;    

    readonly previewProduct5: Locator;    

    readonly previewProduct6: Locator;

    
    readonly products = {

        backpack: 'sauce-labs-backpack',
        bikeLight: 'sauce-labs-bike-light',
        boltTshirt: 'sauce-labs-bolt-t-shirt',
        fleeceJacket: 'sauce-labs-fleece-jacket',
        onesie: 'sauce-labs-onesie',
        redTshirt: 'test.allthethings()-t-shirt-(red)'

    };


    readonly addToCarButtonOnProductPreviewPage: Locator;
    readonly removeButtonOnProductPreviewPage: Locator;
    
    readonly backToProductButton: Locator;

//------------------------------------------------------------------------------------------------------------------------    

    constructor(page: Page){
        this.page = page;
        
        this.sortProductButton= page.locator('select.product_sort_container');
                       
        
        this.previewProduct1 = page.locator(':text("Sauce Labs Backpack")');

        
        this.previewProduct2 = page.locator(':text("Sauce Labs Bike Light")');


        this.previewProduct3 = page.locator(':text("Sauce Labs Bolt T-Shirt")');


        this.previewProduct4 = page.locator(':text("Sauce Labs Fleece Jacket")');


        this.previewProduct5= page.locator(':text("Sauce Labs Onesie")');


        this.previewProduct6= page.locator(':text("Test.allTheThings() T-Shirt (Red)")');


        this.addToCarButtonOnProductPreviewPage= page.locator('button:has-text("Add to cart")');
        this.removeButtonOnProductPreviewPage= page.locator('button:has-text("Remove")');

        this.backToProductButton= page.locator('button[name="back-to-products"]');
       

    }

//-----------------------------------------------------------------------------------------------------------------------
    async verifyCurrentURL(expectedURL: string){
        const actualURL = this.page.url();
        expect(actualURL).toBe(expectedURL);
    }
    
    async addProduct(productId: string) {

        const addButton= this.page.locator(`[name="add-to-cart-${productId}"]`);
        const removeButton= this.page.locator(`[name="remove-${productId}"]`);

        if (await removeButton.isVisible()) {
            console.log(`${productId} already added`);
            return;
        }

        await addButton.click();
    }



    async removeProduct(productId: string) {

        const removeButton = this.page.locator(`[name="remove-${productId}"]`);

        if (await removeButton.isVisible()) {
            await removeButton.click();

        } 
        else {

        console.log(`${productId} is already removed`);

        }

    }




}