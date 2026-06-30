import {Page, Locator, expect} from '@playwright/test'


export class HeaderComponent{

    readonly page: Page;

    // Logo 
    readonly logoText: Locator;

    // Cart Icon & No. on Cart icon
    readonly shoppingCartIcon: Locator;
    readonly numberOnCartIcon: Locator;

//------------------------------------------------------------------------------------------------------------------------    

    constructor(page: Page){
        this.page = page;
        
        this.logoText = page.locator('div').filter({ hasText: 'Swag Labs' }).first();
        this.shoppingCartIcon= page.locator('a.shopping_cart_link:visible');  
        this.numberOnCartIcon = page.locator('span.shopping_cart_badge');

    }

//--------------------------------------------------------------------------------------------------------------------------


    async verifytheLogo(expectedText:string){
        await expect(this.logoText).toHaveText(expectedText);

    }

//--------------------------------------------------------------------------------------------------------------------------


    async OpentheCart(){
        await this.shoppingCartIcon.click();
        
    }

    
    async getCartCount(): Promise<number> {
        
        if (!(await this.numberOnCartIcon.isVisible())) {
            return 0;
        }

        const countText = await this.numberOnCartIcon.textContent();
        return Number(countText);

    }

    async VerifycountOnCart(expectedCount: number) {
        expect(this.numberOnCartIcon).toHaveText(expectedCount.toString());

    }



}