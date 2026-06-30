import {Page, Locator, expect} from '@playwright/test'


export class HomePage{

    readonly page: Page;

    // Header: Hamburger button with options

    readonly hamburgerIcon: Locator;
    readonly allItemsOption: Locator;
    readonly aboutOption: Locator;
    readonly logoutOption: Locator;
    readonly resetAppStateOption: Locator;

    // Logo 
    readonly logoText: Locator;

    // Cart Icon & No. on Cart icon
    readonly shoppingCartIcon: Locator;
    readonly numberOnCartIcon: Locator;

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
    readonly addToCarButtonOnHomePageProduct1: Locator;
    readonly removeButtonOnHomePageProduct1: Locator;

    
    readonly addToCarButtonOnHomePageProduct2: Locator;
    readonly removeButtonOnHomePageProduct2: Locator;
    readonly previewProduct2: Locator;

    
    readonly addToCarButtonOnHomePageProduct3: Locator;
    readonly removeButtonOnHomePageProduct3: Locator;
    readonly previewProduct3: Locator;

    
    readonly addToCarButtonOnHomePageProduct4: Locator;
    readonly removeButtonOnHomePageProduct4: Locator;
    readonly previewProduct4: Locator;    

    
    readonly addToCarButtonOnHomePageProduct5: Locator;
    readonly removeButtonOnHomePageProduct5: Locator;
    readonly previewProduct5: Locator;    

    
    readonly addToCarButtonOnHomePageProduct6: Locator;
    readonly removeButtonOnHomePageProduct6: Locator;
    readonly previewProduct6: Locator;


    readonly addToCarButtonOnProductPreviewPage: Locator;
    readonly removeButtonOnProductPreviewPage: Locator;
    
    readonly backToProductButton: Locator;

    // Footer Web Element

    readonly twitterIcon: Locator;
    readonly facebookIcon: Locator;
    readonly linkedInIcon: Locator;

    readonly footerText: Locator;

    //------------------------------------------------------------------------------------------------------------------------    

    constructor(page: Page){
        this.page = page;
        this.hamburgerIcon = page.locator('#react-burger-menu-btn');
        this.allItemsOption = page.locator(':text("All Items")');
        this.aboutOption = page.locator(':text("About")');
        this.logoutOption = page.locator(':text("Logout")')
        this.resetAppStateOption = page.locator(':text("Reset App State")');

        this.logoText = page.locator('div').filter({ hasText: 'Swag Labs' }).first();

        this.shoppingCartIcon = page.locator('a.shopping_cart_link:visible');
        this.numberOnCartIcon= page.locator("(('span').filter({ hasText: '2' })");

        this.sortProductButton= page.locator('select.product_sort_container');
        
               
        this.addToCarButtonOnHomePageProduct1 =page.locator('[name="add-to-cart-sauce-labs-backpack"]');
        this.removeButtonOnHomePageProduct1 =page.locator('[name="remove-sauce-labs-backpack"]');
        this.previewProduct1 = page.locator(':text("Sauce Labs Backpack")');


        this.addToCarButtonOnHomePageProduct2= page.locator('[name="add-to-cart-sauce-labs-bike-light"]');
        this.removeButtonOnHomePageProduct2= page.locator('[name="remove-sauce-labs-bike-light"]');
        this.previewProduct2 = page.locator(':text("Sauce Labs Bike Light")');


        this.addToCarButtonOnHomePageProduct3= page.locator('[name="add-to-cart-sauce-labs-bolt-t-shirt"]');
        this.removeButtonOnHomePageProduct3= page.locator('[name="remove-sauce-labs-bolt-t-shirt"]');
        this.previewProduct3 = page.locator(':text("Sauce Labs Bolt T-Shirt")');


        this.addToCarButtonOnHomePageProduct4= page.locator('[name="add-to-cart-sauce-labs-fleece-jacket"]');
        this.removeButtonOnHomePageProduct4= page.locator('[name="remove-sauce-labs-fleece-jacket"]');
        this.previewProduct4 = page.locator(':text("Sauce Labs Fleece Jacket")');


        this.addToCarButtonOnHomePageProduct5=page.locator('button[name="add-to-cart-Sauce Labs Onesie"]');
        this.removeButtonOnHomePageProduct5=page.locator('button[name="add-to-cart-Sauce Labs Onesie"]');
        this.previewProduct5= page.locator(':text("Sauce Labs Onesie")');


        this.addToCarButtonOnHomePageProduct6= page.locator('[name="add-to-cart-test.allthethings()-t-shirt-(red)"]');
        this.removeButtonOnHomePageProduct6= page.locator('[name="remove-test.allthethings()-t-shirt-(red)"]');
        this.previewProduct6= page.locator(':text("Test.allTheThings() T-Shirt (Red)")');


        this.addToCarButtonOnProductPreviewPage= page.locator('button:has-text("Add to cart")');
        this.removeButtonOnProductPreviewPage= page.locator('button:has-text("Remove")');

        this.backToProductButton= page.locator('button[name="back-to-products"]');

        this.twitterIcon= page.locator(':text("Twitter")');
        this.facebookIcon= page.locator(':text("Facebook")');
        this.linkedInIcon= page.locator(':text("LinkedIn")');

        this.footerText= page.locator(':text("© 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy")');
        

    }

    //--------------------------------------------------------------------------------------------------------------------------


    async verifytheLogo(expectedText:string){
        await expect(this.logoText).toHaveText(expectedText);

    }

    async ValidatethePageTitle(expectedTitle: string): Promise<string> {
        const actualPageTitle= await this.page.title();        
        await expect(this.page).toHaveTitle(expectedTitle);
        return actualPageTitle;

    }

    async VerifytheCurrentURL(expectedURL: string): Promise<string> {
        const actualCurrentURL= await this.page.url();
        await expect(this.page).toHaveURL(expectedURL);
        return actualCurrentURL;

    }

    async clickOnAllItemsOption(){
        await this.hamburgerIcon.click();
        await this.allItemsOption.click();


    }

    async clickOnAboutOption(){
        await this.hamburgerIcon.click();
        await this.aboutOption.click();

    }

    async clickOnLogOutOption(){
        await this.hamburgerIcon.click();
        await this.logoutOption.click();


    }

    async clickOnRestAppSateOption() {
        await this.hamburgerIcon.click();
        await this.resetAppStateOption.click();

    }

//--------------------------------------------------------------------------------------------------------------------------


    async sortProductAtoZ(){
        await this.sortProductButton.selectOption({index: 0});      

    }

    async sortProductZtoA(){
       await this.sortProductButton.selectOption({index: 1}); 

    }

    async sortProductLowtoHigh(){
        await this.sortProductButton.selectOption({index: 2});

    }
    
    async sortProductHightoLow(){
        await this.sortProductButton.selectOption({index: 3});

    }


//--------------------------------------------------------------------------------------------------------------------------

    async AddToCartProduct1(){
        const add2CartButtonP1= this.addToCarButtonOnHomePageProduct1;
               
        if(await add2CartButtonP1.isVisible()){
            await this.addToCarButtonOnHomePageProduct1.click();

        }
        else
        {
            console.log("Product is already added to cart");
        }
        

    }

    async RemovetProduct1(){
        const RemoveButtonP1= this.removeButtonOnHomePageProduct1;
        if(await RemoveButtonP1.isVisible()){
            await this.removeButtonOnHomePageProduct1.click();

        }
        else
        {
            console.log("Product is already removed  from cart");
        }


    }

    async AddToCartProduct2(){
        const add2CartButtonP2= this.addToCarButtonOnHomePageProduct2;

         if(await add2CartButtonP2.isVisible()){
            await this.addToCarButtonOnHomePageProduct2.click();

        }
        else
        {
            console.log("Product is already added to cart");
        }
        
    }

    async RemovetProduct2(){
        const RemoveButtonP2= this.removeButtonOnHomePageProduct2;
        if(await RemoveButtonP2.isVisible()){
            await this.removeButtonOnHomePageProduct2.click();

        }
        else
        {
            console.log("Product is already removed  from cart");
        }
        

    }

    async AddToCartProduct3(){
        const add2CartButtonP3= this.addToCarButtonOnHomePageProduct3;
         if(await add2CartButtonP3.isVisible()){
            await this.addToCarButtonOnHomePageProduct3.click();

        }
        else
        {
            console.log("Product is already added to cart");
        }
        
    }

    async RemovetProduct3(){
        const RemoveButtonP3= this.removeButtonOnHomePageProduct3;
        if(await RemoveButtonP3.isVisible()){
            await this.removeButtonOnHomePageProduct3.click();

        }
        else
        {
            console.log("Product is already removed  from cart");
        }

    }

    async AddToCartProduct4(){
        const add2CartButtonP4= this.addToCarButtonOnHomePageProduct4;
         if(await add2CartButtonP4.isVisible()){
            await this.addToCarButtonOnHomePageProduct4.click();

        }
        else
        {
            console.log("Product is already added to cart");
        }
        
    }

    async RemovetProduct4(){
        const RemoveButtonP4= this.removeButtonOnHomePageProduct4;
        if(await RemoveButtonP4.isVisible()){
            await this.removeButtonOnHomePageProduct4.click();

        }
        else
        {
            console.log("Product is already removed  from cart");
        }

    }


    async AddToCartProduct5(){
        const add2CartButtonP5= this.addToCarButtonOnHomePageProduct5;
         if(await add2CartButtonP5.isVisible()){
            await this.addToCarButtonOnHomePageProduct5.click();

        }
        else
        {
            console.log("Product is already added to cart");
        }
        
    }

    async RemovetProduct5(){
        const RemoveButtonP5= this.removeButtonOnHomePageProduct5;
        if(await RemoveButtonP5.isVisible()){
            await this.removeButtonOnHomePageProduct5.click();

        }
        else
        {
            console.log("Product is already removed  from cart");
        }

    }

    async AddToCartProduct6(){
        const add2CartButtonP6= this.addToCarButtonOnHomePageProduct6;
        
         if(await add2CartButtonP6.isVisible()){
            await this.addToCarButtonOnHomePageProduct6.click();
        }
        else
        {
            console.log("Product is already added to cart");
        }
    }

    async RemovetProduct6(){
        const RemoveButtonP6= this.removeButtonOnHomePageProduct6;
        if(await RemoveButtonP6.isVisible()){
            await this.removeButtonOnHomePageProduct6.click();

        }
        else
        {
            console.log("Product is already removed  from cart");
        }

    }



//--------------------------------------------------------------------------------------------------------------------------


    async OpentheCart(){
        await this.shoppingCartIcon.click();
        
    }



//--------------------------------------------------------------------------------------------------------------------------


    async OpenTwitterPage(){
        await this.twitterIcon.click();

    }

    async OpenFacebookPage(){
        await this.facebookIcon.click();

    }

    async OpenLinkedInPage(){
        await this.linkedInIcon.click();

    }

    async verifytheFooterText(expectedFooter: string){
        expect(this.footerText).toHaveText(expectedFooter);

    }




}