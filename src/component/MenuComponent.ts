import {Page, Locator, expect} from '@playwright/test'


export class MenuComponent{

    readonly page: Page;

    // Header: Hamburger button with options

    readonly hamburgerIcon: Locator;
    readonly allItemsOption: Locator;
    readonly aboutOption: Locator;
    readonly logoutOption: Locator;
    readonly resetAppStateOption: Locator;

    
    //------------------------------------------------------------------------------------------------------------------------    

    constructor(page: Page){
        this.page = page;
        this.hamburgerIcon = page.locator('#react-burger-menu-btn');
        this.allItemsOption = page.locator(':text("All Items")');
        this.aboutOption = page.locator(':text("About")');
        this.logoutOption = page.locator(':text("Logout")')
        this.resetAppStateOption = page.locator(':text("Reset App State")');

    }

    //--------------------------------------------------------------------------------------------------------------------------

    
    async clickAllItemsOption(){
        await this.hamburgerIcon.click();
        await this.allItemsOption.click();
    }

    async clickAboutOption(){
        await this.hamburgerIcon.click();
        await this.aboutOption.click();
    }

    async clickLogoutOption(){
        await this.hamburgerIcon.click();
        await this.logoutOption.click();
    }

    async clickResetAppStateOption() {
        await this.hamburgerIcon.click();
        await this.resetAppStateOption.click();
    }


}