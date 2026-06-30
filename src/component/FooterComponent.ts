import {Page, Locator, expect} from '@playwright/test'


export class FooterComponent{

    readonly page: Page;

// Footer Web Element

    readonly twitterIcon: Locator;
    readonly facebookIcon: Locator;
    readonly linkedInIcon: Locator;

    readonly footerText: Locator;

//------------------------------------------------------------------------------------------------------------------------    

    constructor(page: Page){
        this.page = page;

        this.twitterIcon= page.locator(':text("Twitter")');
        this.facebookIcon= page.locator(':text("Facebook")');
        this.linkedInIcon= page.locator(':text("LinkedIn")');

        this.footerText= page.locator(':text("© 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy")');
        
    }


//--------------------------------------------------------------------------------------------------------------------------


    async openTwitterPage(){
        await this.twitterIcon.click();

    }

    async openFacebookPage(){
        await this.facebookIcon.click();

    }

    async openLinkedInPage(){
        await this.linkedInIcon.click();

    }

    async verifyFooterText(expectedFooter: string){
        await expect(this.footerText).toHaveText(expectedFooter);

    }




}