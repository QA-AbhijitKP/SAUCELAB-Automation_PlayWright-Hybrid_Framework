import {Page, Locator, expect} from '@playwright/test';

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

    readonly removeBackpack: Locator;
    readonly removeBikeLight: Locator;
    readonly removeBoltTShirt: Locator;
    readonly removeFleeceJacket: Locator;
    readonly removeOnesie: Locator;
    readonly removeTShirtRed: Locator;



    constructor(page: Page){
        this.page= page;
        this.pageName= page.getByText('Your Cart');
        this.continueShoppingButton= page.getByText('Continue Shopping');
        this.checkoutButton= page.getByText('Checkout');
        this.backpack= page.getByText('Sauce Labs Backpack');
        this.bikeLight= page.getByText('Sauce Labs Bike Light');
        this.boltTShirt= page.getByText('Sauce Labs Bolt T-Shirt');
        this.fleeceJacket= page.getByText('Sauce Labs Fleece Jacket');
        this.onesie= page.getByText('Sauce Labs Onesie');
        this.tShirtRed= page.getByText('Test.allTheThings() T-Shirt (Red)');

        this.removeBackpack= page.locator('button[name="remove-sauce-labs-backpack"]');
        this.removeBikeLight= page.locator('button[name="remove-sauce-labs-bike-light"]');
        this.removeBoltTShirt= page.locator('button[name="remove-sauce-labs-bolt-t-shirt"]');
        this.removeFleeceJacket= page.locator('button[name="remove-sauce-labs-fleece-jacket"]');
        this.removeOnesie= page.locator('button[name="remove-sauce-labs-onesie"]');
        this.removeTShirtRed= page.locator('button[name="remove-test.allthethings()-t-shirt-(red)"]');

    }

 

    async removeBackpackProduct(){
        await this.removeBackpack.click();

    }

    async removeBikeLightProduct(){
        await this.removeBikeLight.click();

    }

    async removeBoltTShirtProduct(){
        await this.removeBoltTShirt.click();

    }

    async removeFleeceJacketProduct(){
        await this.removeFleeceJacket.click();

    }

    async removeOnesieProduct(){
        await this.removeOnesie.click();

    }

    async removeTShirtRedProduct(){
        await this.removeTShirtRed.click();

    }



  
    

    

}


// Your Cart Page:

async verifyBikeLightDisplayed(){
        await expect(this.bikeLight).toBeVisible();
    }
  

    async removeBikeLightProduct(){
        await this.removeBikeLight.click();

    }
//-------------------------------------------------------
     async verifyBoltTShirtDisplayed(){
        await expect(this.boltTShirt).toBeVisible();
    }

    async removeBoltTShirtProduct(){
        await this.removeBoltTShirt.click();

    }
//-------------------------------------------------------
     async verifyFleeceJacketDisplayed(){
        await expect(this.fleeceJacket).toBeVisible();
    }

    async removeFleeceJacketProduct(){
        await this.removeFleeceJacket.click();

    }

//-------------------------------------------------------
    async verifyOnesieDisplayed(){
        await expect(this.onesie).toBeVisible();
    }

    async removeOnesieProduct(){
        await this.removeOnesie.click();

    }
//------------------------------------------------------
        async verifyTShirtRedDisplayed(){
        await expect(this.tShirtRed).toBeVisible();

    }


    async removeTShirtRedProduct(){
        await this.removeTShirtRed.click();

    }

    readonly removeBackpack: Locator;
    readonly removeBikeLight: Locator;
    readonly removeBoltTShirt: Locator;
    readonly removeFleeceJacket: Locator;
    readonly removeOnesie: Locator;
    readonly removeTShirtRed: Locator;

    
            this.removeBackpack= page.locator('button[name="remove-sauce-labs-backpack"]');
        this.removeBikeLight= page.locator('button[name="remove-sauce-labs-bike-light"]');
        this.removeBoltTShirt= page.locator('button[name="remove-sauce-labs-bolt-t-shirt"]');
        this.removeFleeceJacket= page.locator('button[name="remove-sauce-labs-fleece-jacket"]');
        this.removeOnesie= page.locator('button[name="remove-sauce-labs-onesie"]');
        this.removeTShirtRed= page.locator('button[name="remove-test.allthethings()-t-shirt-(red)"]');

        //-----------------------------------------------------------------------------------------------------------------------


