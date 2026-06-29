import {Page, Locator} from '@playwright/test'

export class LoginPage{

    
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
    readonly addToCarButtonOnProductPreviewPageProduct1: Locator;
    readonly removeButtonOnProductPreviewPageProduct1: Locator;

    
    readonly addToCarButtonOnHomePageProduct2: Locator;
    readonly removeButtonOnHomePageProduct2: Locator;
    readonly previewProduct2: Locator;
    readonly addToCarButtonOnProductPreviewPageProduct2: Locator;
    readonly removeButtonOnProductPreviewPageProduct2: Locator;

    
    readonly addToCarButtonOnHomePageProduct3: Locator;
    readonly removeButtonOnHomePageProduct3: Locator;
    readonly previewProduct3: Locator;
    readonly addToCarButtonOnProductPreviewPageProduct3: Locator;
    readonly removeButtonOnProductPreviewPageProduct3: Locator;

    
    readonly addToCarButtonOnHomePageProduct4: Locator;
    readonly removeButtonOnHomePageProduct4: Locator;
    readonly previewProduct4: Locator;
    readonly addToCarButtonOnProductPreviewPageProduct4: Locator;
    readonly removeButtonOnProductPreviewPageProduct4: Locator;

    
    readonly addToCarButtonOnHomePageProduct5: Locator;
    readonly removeButtonOnHomePageProduct5: Locator;
    readonly previewProduct5: Locator;
    readonly addToCarButtonOnProductPreviewPageProduct5: Locator;
    readonly removeButtonOnProductPreviewPageProduct5: Locator;

    
    readonly addToCarButtonOnHomePageProduct6: Locator;
    readonly removeButtonOnHomePageProduct6: Locator;
    readonly previewProduct6: Locator;
    readonly addToCarButtonOnProductPreviewPageProduct6: Locator;
    readonly removeButtonOnProductPreviewPageProduct6: Locator;
    
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

        this.sortProductButton= page.locator('select.product_sort_container');
        
               
        this.addToCarButtonOnHomePageProduct1 =page.locator('[name="add-to-cart-sauce-labs-backpack"]');
        this.removeButtonOnHomePageProduct1 =page.locator('[name="remove-sauce-labs-backpack"]');
        this.previewProduct1 = page.locator(':text("Sauce Labs Backpack")');
        this.addToCarButtonOnProductPreviewPageProduct1= page.locator('button:has-text("Add to cart")');
        this.removeButtonOnProductPreviewPageProduct1= page.locator('button:has-text("Remove")');

        this.addToCarButtonOnHomePageProduct2= page.locator('[name="add-to-cart-sauce-labs-bike-light"]');
        this.removeButtonOnHomePageProduct2= page.locator('[name="remove-sauce-labs-bike-light"]');
        this.previewProduct2 = page.locator(':text("Sauce Labs Bike Light")');
        this.addToCarButtonOnProductPreviewPageProduct2= page.locator('button:has-text("Add to cart")');
        this.removeButtonOnProductPreviewPageProduct2= page.locator('button:has-text("Remove")');

        this.addToCarButtonOnHomePageProduct3= page.locator('[name="add-to-cart-sauce-labs-bolt-t-shirt"]');
        this.removeButtonOnHomePageProduct3= page.locator('[name="remove-sauce-labs-bolt-t-shirt"]');
        this.previewProduct3 = page.locator(':text("Sauce Labs Bolt T-Shirt")');
        this.addToCarButtonOnProductPreviewPageProduct3= page.locator('button:has-text("Add to cart")');
        this.removeButtonOnProductPreviewPageProduct3= page.locator('button:has-text("Remove")');

        this.addToCarButtonOnHomePageProduct4= page.locator('[name="add-to-cart-sauce-labs-fleece-jacket"]');
        this.removeButtonOnHomePageProduct4= page.locator('[name="remove-sauce-labs-bike-light"]');
        this.previewProduct4 = page.locator(':text("Sauce Labs Fleece Jacket")');
        this.addToCarButtonOnProductPreviewPageProduct4= page.locator('button:has-text("Add to cart")');
        this.removeButtonOnProductPreviewPageProduct4= page.locator('button:has-text("Remove")');

        this.addToCarButtonOnHomePageProduct5=
        this.removeButtonOnHomePageProduct5=
        this.previewProduct5= page.locator(':text("Sauce Labs Onesie")');
        this.addToCarButtonOnProductPreviewPageProduct5= page.locator('button:has-text("Add to cart")');
        this.removeButtonOnProductPreviewPageProduct5= page.locator('button:has-text("Remove")');

        this.addToCarButtonOnHomePageProduct6= page.locator('[name="add-to-cart-test.allthethings()-t-shirt-(red)"]');
        this.removeButtonOnHomePageProduct6= page.locator('[name="remove-test.allthethings()-t-shirt-(red)"]');
        this.previewProduct6= page.locator(':text("Test.allTheThings() T-Shirt (Red)")');
        this.addToCarButtonOnProductPreviewPageProduct6= page.locator('button:has-text("Add to cart")');
        this.removeButtonOnProductPreviewPageProduct6= page.locator('button:has-text("Remove")');

        this.backToProductButton= page.locator('button:has-text("Remove")');

        this.twitterIcon= page.locator(':text("Twitter")');
        this.facebookIcon= page.locator(':text("Facebook")');
        this.linkedInIcon= page.locator(':text("LinkedIn")');

        this.footerText= page.locator(':text("© 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy")');
        

    }

    //--------------------------------------------------------------------------------------------------------------------------


    async verifytheLogo(){
        
        
    }

    async verifyLoginSuccess(){

    
    }
}