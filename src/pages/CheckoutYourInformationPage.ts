import {Page, Locator, expect} from '@playwright/test';
import { CheckoutOverviewPage } from './CheckoutOverview';
import { YourCartPage } from './YourCartPage';

export class CheckoutYourInformationPage{

    readonly page: Page;
    readonly pageName: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly zipCode: Locator;
    readonly cancelButton: Locator;
    readonly continueButton: Locator;


    constructor(page: Page){
        this.page= page;
        this.pageName= page.getByText('Checkout: Your Information');
        this.firstName= page.locator('[data-test="firstName"]');
        this.lastName= page.locator('[data-test="lastName"]');
        this.zipCode= page.locator("//input[@id='postal-code']");
        this.cancelButton= page.getByText('Cancel');
        this.continueButton= page.locator("//input[@id='continue']");
    }

    async verifyPageName(expectedText: string){
        expect(this.pageName).toHaveText(expectedText);

    }

    async verifyCurrentURL(expectedURL:string){
        await expect(this.page).toHaveURL(expectedURL);
    }

   
    async fillUserDetails(   
        firstName: string,
        lastName: string,
        zipCode: string
    ) {
        await this.firstName.click();
        await this.page.keyboard.type(firstName);
        await this.page.waitForTimeout(2000); // Wait for 1 second

        await this.page.keyboard.press('Tab');
        await this.page.keyboard.type(lastName);
       
        await this.page.keyboard.press('Tab');
        await this.page.keyboard.type(zipCode);
        
    }


    //------------------------------------

    
    async verifyAllFieldsHaveValue() {
        await expect(this.firstName).toHaveValue(/.+/);
        await expect(this.lastName).toHaveValue(/.+/);
        await expect(this.zipCode).toHaveValue(/.+/);
    }


     // Navigation
     
    async clickCancelButton(){
        await expect(this.cancelButton).toBeVisible();
        await this.cancelButton.click();
        return new YourCartPage(this.page);


        
    }

    async clickContinueButton(){
        await expect(this.continueButton).toBeVisible();
        await this.continueButton.click();
        await this.page.waitForURL('**/checkout-step-two.html');
        
    }


}

//npx playwright test tests/end2EndTest.spe